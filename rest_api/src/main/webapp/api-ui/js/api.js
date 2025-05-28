/**
 * API service for interacting with the blog REST API
 */
class BlogApiService {
  constructor() {
    this.baseUrl = '/api/blogs';
    this.usersUrl = '/api/users'; // Assuming there's a users endpoint
  }

  /**
   * Get all blog posts with pagination
   * @param {number} page - Page number (default: 1)
   * @param {number} size - Page size (default: 10)
   * @returns {Promise<Array>} - Promise resolving to array of blog posts
   */
  async getBlogs(page = 1, size = 10) {
    try {
      const response = await fetch(`${this.baseUrl}?page=${page}&size=${size}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  }

  /**
   * Get a specific blog post by ID
   * @param {number} id - Blog post ID
   * @returns {Promise<Object>} - Promise resolving to blog post object
   */
  async getBlogById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blog: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching blog ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new blog post
   * @param {Object} blogData - Blog data object
   * @returns {Promise<Object>} - Promise resolving to created blog post
   */
  async createBlog(blogData) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create blog: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  }

  /**
   * Update an existing blog post
   * @param {number} id - Blog post ID
   * @param {Object} blogData - Updated blog data
   * @returns {Promise<Object>} - Promise resolving to updated blog post
   */
  async updateBlog(id, blogData) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update blog: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating blog ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a blog post
   * @param {number} id - Blog post ID
   * @returns {Promise<void>}
   */
  async deleteBlog(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete blog: ${errorText}`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting blog ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get all users (for author selection)
   * @returns {Promise<Array>} - Promise resolving to array of users
   */
  async getUsers() {
    try {
      const response = await fetch(this.usersUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}
