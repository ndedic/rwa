document.addEventListener("DOMContentLoaded", () => {
    'use strict';

    const elements = {
        addNew: document.getElementById('addNew'),
        newItem: document.getElementById('newItem'),
        completed: document.getElementById('completed'),
        active: document.getElementById('active'),
        all: document.getElementById('all'),
        items: document.getElementById('items')
    };

    const todoList = [
        { text: 'Todo item 1', checked: false },
        { text: 'Todo item 2', checked: true },
        { text: 'Todo item 3', checked: true }
    ];

    const createItem = (text, checked) => {
        const item = document.createElement('li');
        const status = checked ? "checked" : "";
        
        const html = `
            <div class="item">
                <input class="itemStatus" type="checkbox" ${status}/>
                <div class="itemText">${text}</div>
                <div class="deleteItem">X</div>
            </div>
        `;

        item.innerHTML = html;

        const checkStatus = (checkBox) => {
            const txt = item.querySelector('.itemText');
            checkBox.checked
                ? txt.classList.add('itemDone')
                : txt.classList.remove('itemDone');
        };

        item.querySelector('.deleteItem').addEventListener('click', () => {
            item.remove();
        });

        item.querySelector('.itemStatus').addEventListener('click', function() {
            checkStatus(this);
        });

        checkStatus(item.querySelector('.itemStatus'));

        return item;
    };

    const walkItems = (callback) => {
        const nodes = items.querySelectorAll('.item');
        [...nodes].forEach(node => {
            if (typeof callback === 'function') {
                callback(node);
            }
        });
    };

    // Initialize todo list
    const init = (todoList) => {
        todoList.forEach(e => {
            elements.items.appendChild(createItem(e.text, e.checked));
        });
    };

    // Event Listeners
    elements.addNew.addEventListener('click', () => {
        const { value } = elements.newItem;
        if (!value.length) {
            console.log('Can not add an empty item');
            return;
        }
        const item = createItem(value, false);
        elements.items.appendChild(item);
        elements.newItem.value = '';
    });

    elements.completed.addEventListener('click', () => {
        walkItems(item => {
            const cb = item.querySelector('.itemStatus');
            item.classList.remove('hidden');
            if (!cb.checked) {
                item.classList.add('hidden');
            }
        });
    });

    elements.active.addEventListener('click', () => {
        walkItems(item => {
            const cb = item.querySelector('.itemStatus');
            item.classList.remove('hidden');
            if (cb.checked) {
                item.classList.add('hidden');
            }
        });
    });

    elements.all.addEventListener('click', () => {
        walkItems(item => {
            item.classList.remove('hidden');
        });
    });

    init(todoList);
});
