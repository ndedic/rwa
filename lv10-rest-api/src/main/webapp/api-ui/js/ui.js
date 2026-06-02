/**
 * UI helper class for managing DOM interactions
 */
class BlogUI {
  constructor() {
    // Main containers
    this.blogListContainer = document.querySelector('.blog-list-container');
    this.blogFormContainer = document.getElementById('blogFormContainer');
    this.blogDetailContainer = document.getElementById('blogDetailContainer');
    this.blogList = document.getElementById('blogList');
    
    // Form elements
    this.blogForm = document.getElementById('blogForm');
    this.formTitle = document.getElementById('formTitle');
    this.blogIdInput = document.getElementById('blogId');
    this.titleInput = document.getElementById('title');
    this.contentInput = document.getElementById('content');
    this.userIdSelect = document.getElementById('userId');
    
    // Detail view elements
    this.detailTitle = document.getElementById('detailTitle');
    this.detailAuthor = document.getElementById('detailAuthor');
    this.detailDate = document.getElementById('detailDate');
    this.detailContent = document.getElementById('detailContent');
    
    // Pagination elements
    this.prevPageBtn = document.getElementById('prevPage');
    this.nextPageBtn = document.getElementById('nextPage');
    this.pageInfo = document.getElementById('pageInfo');
    
    // Modal elements
    this.confirmationModal = document.getElementById('confirmationModal');
    this.toastContainer = document.getElementById('toastContainer');
  }

  /**
   * Show the blog list view
   */
  showBlogList() {
    this.blogListContainer.classList.remove('hidden');
    this.blogFormContainer.classList.add('hidden');
    this.blogDetailContainer.classList.add('hidden');
  }

  /**
   * Show the blog form for creating or editing
   * @param {boolean} isEdit - Whether this is an edit operation
   */
  showBlogForm(isEdit = false) {
    this.blogListContainer.classList.add('hidden');
    this.blogFormContainer.classList.remove('hidden');
    this.blogDetailContainer.classList.add('hidden');
    
    this.formTitle.textContent = isEdit ? 'Edit Blog Post' : 'New Blog Post';
  }

  /**
   * Show the blog detail view
   */
  showBlogDetail() {
    this.blogListContainer.classList.add('hidden');
    this.blogFormContainer.classList.add('hidden');
    this.blogDetailContainer.classList.remove('hidden');
  }

  /**
   * Reset the blog form
   */
  resetForm() {
    this.blogForm.reset();
    this.blogIdInput.value = '';
  }

  /**
   * Populate the blog form with data for editing
   * @param {Object} blog - Blog data to populate the form with
   */
  populateForm(blog) {
    this.blogIdInput.value = blog.id;
    this.titleInput.value = blog.title;
    this.contentInput.value = blog.content;
    this.userIdSelect.value = blog.createdBy.id;
  }

  /**
   * Populate the blog detail view
   * @param {Object} blog - Blog data to display
   */
  populateDetail(blog) {
    this.detailTitle.textContent = blog.title;
    this.detailAuthor.textContent = `By: ${blog.createdBy.firstname} ${blog.createdBy.lastname}`;
    
    const createdDate = new Date(blog.createdAt);
    let dateText = `Created: ${this.formatDate(createdDate)}`;
    
    if (blog.updatedAt) {
      const updatedDate = new Date(blog.updatedAt);
      dateText += ` | Updated: ${this.formatDate(updatedDate)}`;
    }
    
    this.detailDate.textContent = dateText;
    this.detailContent.textContent = blog.content;
  }

  /**
   * Render the blog list
   * @param {Array} blogs - Array of blog objects
   */
  renderBlogList(blogs) {
    this.blogList.innerHTML = '';
    
    if (blogs.length === 0) {
      this.blogList.innerHTML = '<div class="no-blogs">No blog posts found.</div>';
      return;
    }
    
    blogs.forEach(blog => {
      const blogItem = document.createElement('div');
      blogItem.className = 'blog-item';
      blogItem.dataset.id = blog.id;
      
      const createdDate = new Date(blog.createdAt);
      
      blogItem.innerHTML = `
        <h3>${blog.title}</h3>
        <div class="blog-meta">
          <span>By: ${blog.createdBy.firstname} ${blog.createdBy.lastname}</span>
          <span>${this.formatDate(createdDate)}</span>
        </div>
        <div class="blog-content-preview">${this.truncateText(blog.content, 150)}</div>
      `;
      
      this.blogList.appendChild(blogItem);
    });
  }

  /**
   * Populate the user select dropdown
   * @param {Array} users - Array of user objects
   */
  populateUserSelect(users) {
    this.userIdSelect.innerHTML = '';
    
    users.forEach(user => {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = `${user.firstname} ${user.lastname} (${user.username})`;
      this.userIdSelect.appendChild(option);
    });
  }

  /**
   * Update pagination information
   * @param {number} currentPage - Current page number
   * @param {number} totalBlogs - Total number of blogs (if available)
   * @param {number} pageSize - Page size
   */
  updatePagination(currentPage, totalBlogs = null, pageSize = 10) {
    this.pageInfo.textContent = `Page ${currentPage}`;
    
    // Disable previous button on first page
    this.prevPageBtn.disabled = currentPage <= 1;
    
    // If we know the total, we can disable the next button on the last page
    if (totalBlogs !== null) {
      const totalPages = Math.ceil(totalBlogs / pageSize);
      this.nextPageBtn.disabled = currentPage >= totalPages;
    }
  }

  /**
   * Show the confirmation modal
   * @returns {Promise<boolean>} - Promise resolving to user's choice
   */
  showConfirmationModal() {
    return new Promise(resolve => {
      this.confirmationModal.classList.remove('hidden');
      
      const confirmBtn = document.getElementById('confirmDeleteBtn');
      const cancelBtn = document.getElementById('cancelDeleteBtn');
      
      const handleConfirm = () => {
        this.confirmationModal.classList.add('hidden');
        cleanup();
        resolve(true);
      };
      
      const handleCancel = () => {
        this.confirmationModal.classList.add('hidden');
        cleanup();
        resolve(false);
      };
      
      const cleanup = () => {
        confirmBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
      };
      
      confirmBtn.addEventListener('click', handleConfirm);
      cancelBtn.addEventListener('click', handleCancel);
    });
  }

  /**
   * Show a toast notification
   * @param {string} message - Message to display
   * @param {string} type - Notification type ('success' or 'error')
   */
  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    this.toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        this.toastContainer.removeChild(toast);
      }, 300);
    }, 3000);
  }

  /**
   * Format a date for display
   * @param {Date} date - Date to format
   * @returns {string} - Formatted date string
   */
  formatDate(date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Truncate text to a specified length
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} - Truncated text
   */
  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
}
