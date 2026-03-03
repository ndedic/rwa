package com.example.blog.rest;

import com.example.blog.model.BlogEntry;
import com.example.blog.model.User;
import com.example.blog.service.BlogService;
import com.example.blog.service.UserService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Path("/blogs")
public class BlogResource {
    
    private BlogService blogService = new BlogService();
    private UserService userService = new UserService();
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllBlogs(
            @QueryParam("page") Integer page,
            @QueryParam("size") Integer size) {
        
        // Default pagination values if not provided
        int pageNumber = (page != null) ? page : 1;
        int pageSize = (size != null) ? size : 10;
        
        List<BlogEntry> blogs = blogService.getAllBlogs(pageNumber, pageSize);
        return Response.ok(blogs).build();
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBlogById(@PathParam("id") Long id) {
        Optional<BlogEntry> blog = blogService.getBlogEntryById(id);
        
        if (blog.isPresent()) {
            return Response.ok(blog.get()).build();
        } else {
            return Response.status(Status.NOT_FOUND)
                    .entity("Blog with ID " + id + " not found")
                    .build();
        }
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createBlog(BlogEntryDTO blogDTO) {
        if (blogDTO.getTitle() == null || blogDTO.getContent() == null || blogDTO.getUserId() == null) {
            return Response.status(Status.BAD_REQUEST)
                    .entity("Title, content, and userId are required fields")
                    .build();
        }
        
        Optional<User> user = userService.getUserById(blogDTO.getUserId());
        if (!user.isPresent()) {
            return Response.status(Status.BAD_REQUEST)
                    .entity("User with ID " + blogDTO.getUserId() + " not found")
                    .build();
        }
        
        BlogEntry blog = new BlogEntry();
        blog.setTitle(blogDTO.getTitle());
        blog.setContent(blogDTO.getContent());
        blog.setCreatedBy(user.get());
        blog.setCreatedAt(LocalDateTime.now());
        
        blogService.saveBlogEntry(blog);
        
        return Response.status(Status.CREATED).entity(blog).build();
    }
    
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateBlog(@PathParam("id") Long id, BlogEntryDTO blogDTO) {
        Optional<BlogEntry> existingBlog = blogService.getBlogEntryById(id);
        
        if (!existingBlog.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity("Blog with ID " + id + " not found")
                    .build();
        }
        
        BlogEntry blog = existingBlog.get();
        
        if (blogDTO.getTitle() != null) {
            blog.setTitle(blogDTO.getTitle());
        }
        
        if (blogDTO.getContent() != null) {
            blog.setContent(blogDTO.getContent());
        }
        
        if (blogDTO.getUserId() != null && !blogDTO.getUserId().equals(blog.getCreatedBy().getId())) {
            Optional<User> user = userService.getUserById(blogDTO.getUserId());
            if (!user.isPresent()) {
                return Response.status(Status.BAD_REQUEST)
                        .entity("User with ID " + blogDTO.getUserId() + " not found")
                        .build();
            }
            blog.setCreatedBy(user.get());
        }
        
        blog.setUpdatedAt(LocalDateTime.now());
        blogService.saveBlogEntry(blog);
        
        return Response.ok(blog).build();
    }
    
    @DELETE
    @Path("/{id}")
    public Response deleteBlog(@PathParam("id") Long id) {
        Optional<BlogEntry> existingBlog = blogService.getBlogEntryById(id);
        
        if (!existingBlog.isPresent()) {
            return Response.status(Status.NOT_FOUND)
                    .entity("Blog with ID " + id + " not found")
                    .build();
        }
        
        blogService.deleteBlogEntry(id);
        
        return Response.status(Status.NO_CONTENT).build();
    }
    
    
}
