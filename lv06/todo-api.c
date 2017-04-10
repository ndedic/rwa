#include <stdio.h>
#include <stdlib.h>

typedef struct
{
    char text[250];
    int checked;
} TodoItem;

typedef struct
{
    TodoItem *items;
    int size;
} TodoItemList;

TodoItemList newList(int);
TodoItemList buildList();
void printBody(TodoItemList);
void printHeader();

TodoItemList newList(int size)
{
    TodoItemList list =
    {
        malloc(size * sizeof(TodoItem)),
        size
    };
    return list;
}

TodoItemList buildList()
{

    TodoItemList list = newList(3);

    TodoItem item1 = {"Todo item 1", 0};
    TodoItem item2 = {"Todo item 2", 1};
    TodoItem item3 = {"Todo item 3", 1};

    list.items[0] = item1;
    list.items[1] = item2;
    list.items[2] = item3;

    return list;
}

void printHeader() {
    printf("Content-type: application/json\n\n");
}

void printBody(TodoItemList list)
{
	  int i;
    putchar('[');
    for(i = 0; i < list.size; i++)
    {
        TodoItem item = list.items[i];
        char *checked;

        if (item.checked) 
        {
            checked = "true";
        } 
        else 
        {
            checked = "false";
        }
        
        putchar('{');
        printf("\"text\":\"%s\"", item.text);
        putchar(',');
        printf("\"checked\":%s", checked);
		    putchar('}');

        if (i != list.size - 1) 
        {
            putchar(',');
        }
    }
    putchar(']');
}

int main()
{
    printHeader();
    printBody(buildList());
    return 0;
}
