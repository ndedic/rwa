package com.example;

/**
 * Represents a Todo item with text description and checked status
 */
public class TodoItem {
    private String text;
    private boolean checked;
    
    /**
     * Constructor for creating a new TodoItem
     * 
     * @param text The description of the todo item
     * @param checked Whether the item is completed or not
     */
    public TodoItem(String text, boolean checked) {
        this.text = text;
        this.checked = checked;
    }
    
    /**
     * Default constructor for serialization/deserialization
     */
    public TodoItem() {
    }
    
    /**
     * Gets the text description of the todo item
     * 
     * @return The text description
     */
    public String getText() {
        return text;
    }
    
    /**
     * Sets the text description of the todo item
     * 
     * @param text The text description to set
     */
    public void setText(String text) {
        this.text = text;
    }
    
    /**
     * Checks if the todo item is completed
     * 
     * @return true if the item is completed, false otherwise
     */
    public boolean isChecked() {
        return checked;
    }
    
    /**
     * Sets the completion status of the todo item
     * 
     * @param checked The completion status to set
     */
    public void setChecked(boolean checked) {
        this.checked = checked;
    }
    
    @Override
    public String toString() {
        return "TodoItem [text=" + text + ", checked=" + checked + "]";
    }
}