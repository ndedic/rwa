package com.example.blog.service;

import com.example.blog.model.BlogEntry;
import com.example.blog.repository.BlogRepository;
import java.util.List;
import java.util.Optional;

public class BlogService {
    
    private final BlogRepository blogRepository;
    
    public BlogService() {
        this.blogRepository = new BlogRepository();
    }
    
    public List<BlogEntry> getAllBlogEntries() {
        return blogRepository.findAll();
    }
    
    public Optional<BlogEntry> getBlogEntryById(Long id) {
        return blogRepository.findById(id);
    }
    
    public void saveBlogEntry(BlogEntry blogEntry) {
        blogRepository.save(blogEntry);
    }
    
    public void deleteBlogEntry(Long id) {
        blogRepository.delete(id);
    }
}