document.addEventListener("DOMContentLoaded", function () {

    'use strict';

    var addNew = document.getElementById('addNew');
    var newItem = document.getElementById('newItem');
    var completed = document.getElementById('completed');
    var active = document.getElementById('active');
    var all = document.getElementById('all');
    var items = document.getElementById('items');

    var todoList = [
        { text: 'Todo item 1', checked: false },
        { text: 'Todo item 2', checked: true },
        { text: 'Todo item 3', checked: true }
    ];

    function init(todoList) {
        todoList
            .map(function (e, i) {
                items.appendChild(createItem(e.text, e.checked));
            });
    }

    function createItem(text, checked) {

        var item = document.createElement('li');
        var value = newItem.value;
        var status = checked ? "checked" : "";
        var html = '<div class="item">' +
            '<input class="itemStatus" type="checkbox"' + status + '/>' +
            '<div class="itemText">' + text + '</div>' +
            '<div class="deleteItem">X</div>' +
            '</div>';

        item.innerHTML = html;

        item.querySelector('.deleteItem').addEventListener('click', function () {
            item.remove();
        });

        item.querySelector('.itemStatus').addEventListener('click', function () {
            checkStatus(this);
        });

        function checkStatus(checkBox) {
            var txt = item.querySelector('.itemText');
            checkBox.checked
                ? txt.classList.add('itemDone')
                : txt.classList.remove('itemDone');
        }

        checkStatus(item.querySelector('.itemStatus'));

        return item;
    }

    addNew.addEventListener('click', function () {
        var value = newItem.value;
        if (!value.length) {
            console.log('Can not add an empty item');
            return;
        }
        var item = createItem(value, false);
        items.appendChild(item);
        newItem.value = '';
    });

    completed.addEventListener('click', function () {
        walkItems(function (item) {
            var cb = item.querySelector('.itemStatus');
            item.classList.remove('hidden')
            if (!cb.checked) {
                item.classList.add('hidden');
            }
        });
    });

    active.addEventListener('click', function () {
        walkItems(function (item) {
            var cb = item.querySelector('.itemStatus');
            item.classList.remove('hidden');
            if (cb.checked) {
                item.classList.add('hidden');
            }
        });
    });

    all.addEventListener('click', function () {
        walkItems(function (item) {
            item.classList.remove('hidden');
        });
    });

    function walkItems(callback) {
        var nodes = items.querySelectorAll('.item');
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (typeof callback === 'function') {
                callback(node);
            }
        }
    }

    init(todoList);
});
