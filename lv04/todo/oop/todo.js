class TodoApp {
    constructor(wrapperSelector = '#container') {
        this.wrapper = document.querySelector(wrapperSelector);
        
        if (!this.wrapper) {
            throw new Error(`Wrapper element "${wrapperSelector}" not found`);
        }

        this.state = {
            todos: [],
            filter: 'all'
        };
        
        this.elements = {
            addNew: this.wrapper.querySelector('.addNew'),
            newItem: this.wrapper.querySelector('.newItem'),
            completed: this.wrapper.querySelector('.completed'),
            active: this.wrapper.querySelector('.active'),
            all: this.wrapper.querySelector('.all'),
            items: this.wrapper.querySelector('.items')
        };

        // Validate that all required elements exist
        const missingElements = Object.entries(this.elements)
            .filter(([key, element]) => !element)
            .map(([key]) => key);

        if (missingElements.length > 0) {
            throw new Error(`Required elements not found: ${missingElements.join(', ')}`);
        }
        
        this.bindEvents();
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    bindEvents() {
        this.elements.addNew.addEventListener('click', () => this.addTodo());
        this.elements.completed.addEventListener('click', () => this.setFilter('completed'));
        this.elements.active.addEventListener('click', () => this.setFilter('active'));
        this.elements.all.addEventListener('click', () => this.setFilter('all'));

        // Add keyboard event for input
        this.elements.newItem.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
    }

    addTodo() {
        const { value } = this.elements.newItem;
        
        try {
            if (!value.trim()) {
                throw new Error('Todo item cannot be empty');
            }

            const newTodo = {
                id: Date.now(),
                text: value.trim(),
                checked: false
            };

            this.setState({
                todos: [...this.state.todos, newTodo]
            });

            this.elements.newItem.value = '';
        } catch (error) {
            console.error('Error adding todo:', error.message);
        }
    }

    toggleTodo(id) {
        const todos = this.state.todos.map(todo => 
            todo.id === id ? { ...todo, checked: !todo.checked } : todo
        );
        this.setState({ todos });
    }

    deleteTodo(id) {
        const todos = this.state.todos.filter(todo => todo.id !== id);
        this.setState({ todos });
    }

    setFilter(filter) {
        this.setState({ filter });
    }

    getFilteredTodos() {
        const { todos, filter } = this.state;
        
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.checked);
            case 'completed':
                return todos.filter(todo => todo.checked);
            default:
                return todos;
        }
    }

    createTodoElement(todo) {
        const item = document.createElement('li');
        item.innerHTML = `
            <div class="item" data-id="${todo.id}">
                <input class="itemStatus" type="checkbox" ${todo.checked ? 'checked' : ''}/>
                <div class="itemText ${todo.checked ? 'itemDone' : ''}">${todo.text}</div>
                <div class="deleteItem">X</div>
            </div>
        `;

        item.querySelector('.itemStatus').addEventListener('click', () => 
            this.toggleTodo(todo.id)
        );

        item.querySelector('.deleteItem').addEventListener('click', () => 
            this.deleteTodo(todo.id)
        );

        return item;
    }

    render() {
        const { items } = this.elements;
        items.innerHTML = '';
        
        const fragment = document.createDocumentFragment();
        this.getFilteredTodos().forEach(todo => {
            fragment.appendChild(this.createTodoElement(todo));
        });
        
        items.appendChild(fragment);

        // Update filter button states
        ['all', 'active', 'completed'].forEach(filterType => {
            const button = this.elements[filterType];
            if (this.state.filter === filterType) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    try {
        const todoApp1 = new TodoApp('#app1'); 
        todoApp1.setState({
            todos: [
                { id: 1, text: 'Todo item 1', checked: false },
                { id: 2, text: 'Todo item 2', checked: true },
                { id: 3, text: 'Todo item 3', checked: true }
            ]
        });
    } catch (error) {
        console.error('Failed to initialize TodoApp 1:', error.message);
    }

    try {
        const todoApp2 = new TodoApp('#app2'); 
        todoApp2.setState({
            todos: [
                { id: 1, text: 'Todo item 1', checked: false },
                { id: 2, text: 'Todo item 2', checked: true }
            ]
        });
    } catch (error) {
        console.error('Failed to initialize TodoApp 2:', error.message);
    }
});
