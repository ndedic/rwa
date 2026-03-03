/**
 * Main application controller
 */
class BlogApp {
  constructor() {
    this.api = new BlogApiService();
    this.ui = new BlogUI();
    
    this.currentPage = 1;
    this.pageSize = 10;
    this.currentBlogId = null;
    
    this.initEventListeners();
  }
  
  /**
   * Factory method to create and initialize a BlogApp instance
   * @returns {Promise<BlogApp>} Fully initialized BlogApp instance
   */
  static async create() {
    const app = new BlogApp();
    await app.loadInitialData();
    return app;
  }

  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Navigation buttons
    document.getElementById('newBlogBtn').addEventListener('click', () => this.showNewBlogForm());
    document.getElementById('cancelBtn').addEventListener('click', () => this.cancelForm());
    document.getElementById('backToListBtn').addEventListener('click', () => this.showBlogList());
    
    // Pagination
    document.getElementById('prevPage').addEventListener('click', () => this.changePage(-1));
    document.getElementById('nextPage').addEventListener('click', () => this.changePage(1));
    
    // Blog actions
    document.getElementById('editBlogBtn').addEventListener('click', () => this.editCurrentBlog());
    document.getElementById('deleteBlogBtn').addEventListener('click', () => this.deleteCurrentBlog());
    
    // Form submission
    document.getElementById('blogForm').addEventListener('submit', (e) => this.handleFormSubmit(e));
    
    // Blog list item clicks
    document.getElementById('blogList').addEventListener('click', (e) => {
      const blogItem = e.target.closest('.blog-item');
      if (blogItem) {
        const blogId = parseInt(blogItem.dataset.id);
        this.showBlogDetail(blogId);
      }
    });
  }

  /**
   * Load initial data
   */
  async loadInitialData() {
    try {
      // Load users for the dropdown
      const users = await this.api.getUsers();
      this.ui.populateUserSelect(users);
      
      // Load blog list
      await this.loadBlogs();
    } catch (error) {
      this.ui.showToast(`Failed to load initial data: ${error.message}`, 'error');
    }
  }

  /**
   * Load blogs with pagination
   */
  async loadBlogs() {
    try {
      const blogs = await this.api.getBlogs(this.currentPage, this.pageSize);
      this.ui.renderBlogList(blogs);
      this.ui.updatePagination(this.currentPage);
    } catch (error) {
      this.ui.showToast(`Failed to load blogs: ${error.message}`, 'error');
    }
  }

  /**
   * Change the current page
   * @param {number} direction - Direction to change page (1 for next, -1 for previous)
   */
  async changePage(direction) {
    this.currentPage += direction;
    if (this.currentPage < 1) this.currentPage = 1;
    
    await this.loadBlogs();
  }

  /**
   * Show the blog list
   */
  showBlogList() {
    this.ui.showBlogList();
    this.loadBlogs();
  }

  /**
   * Show the form for creating a new blog
   */
  showNewBlogForm() {
    this.ui.resetForm();
    this.ui.showBlogForm(false);
  }

  /**
   * Show the detail view for a blog
   * @param {number} blogId - ID of the blog to show
   */
  async showBlogDetail(blogId) {
    try {
      const blog = await this.api.getBlogById(blogId);
      this.currentBlogId = blogId;
      
      this.ui.populateDetail(blog);
      this.ui.showBlogDetail();
    } catch (error) {
      this.ui.showToast(`Failed to load blog details: ${error.message}`, 'error');
    }
  }

  /**
   * Show the form for editing the current blog
   */
  async editCurrentBlog() {
    if (!this.currentBlogId) return;
    
    try {
      const blog = await this.api.getBlogById(this.currentBlogId);
      this.ui.populateForm(blog);
      this.ui.showBlogForm(true);
    } catch (error) {
      this.ui.showToast(`Failed to load blog for editing: ${error.message}`, 'error');
    }
  }

  /**
   * Delete the current blog
   */
  async deleteCurrentBlog() {
    if (!this.currentBlogId) return;
    
    const confirmed = await this.ui.showConfirmationModal();
    if (!confirmed) return;
    
    try {
      await this.api.deleteBlog(this.currentBlogId);
      this.ui.showToast('Blog post deleted successfully');
      this.showBlogList();
    } catch (error) {
      this.ui.showToast(`Failed to delete blog: ${error.message}`, 'error');
    }
  }

  /**
   * Cancel the current form operation
   */
  cancelForm() {
    if (this.currentBlogId) {
      this.showBlogDetail(this.currentBlogId);
    } else {
      this.showBlogList();
    }
  }

  /**
   * Handle form submission for creating or updating a blog
   * @param {Event} event - Form submission event
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    
    const blogId = this.ui.blogIdInput.value;
    const isEdit = !!blogId;
    
    const blogData = {
      title: this.ui.titleInput.value,
      content: this.ui.contentInput.value,
      userId: parseInt(this.ui.userIdSelect.value)
    };
    
    try {
      if (isEdit) {
        await this.api.updateBlog(blogId, blogData);
        this.ui.showToast('Blog post updated successfully');
      } else {
        const newBlog = await this.api.createBlog(blogData);
        this.currentBlogId = newBlog.id;
        this.ui.showToast('Blog post created successfully');
      }
      
      this.showBlogDetail(this.currentBlogId);
    } catch (error) {
      this.ui.showToast(`Failed to ${isEdit ? 'update' : 'create'} blog: ${error.message}`, 'error');
    }
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  const app = await BlogApp.create();
});
