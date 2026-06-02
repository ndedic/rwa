/**
 * WebSocket Chat Application
 */

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
    const username = prompt('Please enter your username to start chatting') || 'Anonymous';
    const chatApp = new ChatApplication({
        username,
        container: document.getElementById('chat-container')
    });
    chatApp.initialize();
});

/**
 * Main Chat Application class
 */
class ChatApplication {
    /**
     * @param {Object} config - Configuration object
     * @param {string} config.username - User's display name
     * @param {HTMLElement} config.container - Container element for the chat UI
     */
    constructor(config) {
        this.username = config.username;
        this.container = config.container;
        this.userId = `user-${this.generateRandomId()}`;
        this.wsUrl = this.getWebSocketUrl();
        this.client = null;
        this.elements = {
            conversation: this.container.querySelector('#conversation'),
            messageInput: this.container.querySelector('#text'),
            sendButton: this.container.querySelector('#send'),
            status: this.container.querySelector('#status')
        };
    }

    /**
     * Initialize the chat application
     */
    initialize() {
        this.showContainer();
        this.connectWebSocket();
        this.setupEventListeners();
    }

    /**
     * Connect to the WebSocket server
     */
    connectWebSocket() {
        this.client = new WebSocket(this.wsUrl);

        this.client.onopen = () => {
            this.updateStatus(`Connected as ${this.username}`);
        };

        this.client.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Message received', message);

            // Only display messages from other users (our own messages are displayed when sent)
            if (message.userId !== this.userId) {
                this.displayMessage(message, false);
            }
        };

        this.client.onclose = () => {
            this.updateStatus('Disconnected');
        };

        this.client.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.updateStatus('Connection error');
        };
    }

    /**
     * Set up event listeners for user interactions
     */
    setupEventListeners() {
        // Send button click handler
        this.elements.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key press handler
        this.elements.messageInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.sendMessage();
            }
        });
    }

    /**
     * Send a message to the server
     */
    sendMessage() {
        const text = this.elements.messageInput.value.trim();

        if (!text) {
            return;
        }

        const message = {
            username: this.username,
            userId: this.userId,
            text: text
        };

        this.client.send(JSON.stringify(message));
        this.displayMessage(message, true);
        this.elements.messageInput.value = '';
    }

    /**
     * Display a message in the conversation area
     * @param {Object} message - The message to display
     * @param {boolean} isOwnMessage - Whether the message is from the current user
     */
    displayMessage(message, isOwnMessage) {
        const time = this.formatTime(new Date());
        const messageClass = isOwnMessage ? 'own' : 'other';

        const messageElement = document.createElement('div');
        messageElement.className = `message-bubble ${messageClass}`;

        const headerElement = document.createElement('div');
        headerElement.className = 'message-header';
        headerElement.textContent = `${message.username}`;

        const timeElement = document.createElement('span');
        timeElement.className = 'message-time';
        timeElement.textContent = ` ${time}`;
        headerElement.appendChild(timeElement);

        const textElement = document.createElement('div');
        textElement.textContent = message.text;

        messageElement.appendChild(headerElement);
        messageElement.appendChild(textElement);

        this.elements.conversation.appendChild(messageElement);
        this.scrollToBottom();
    }

    /**
     * Update the status display
     * @param {string} status - Status message to display
     */
    updateStatus(status) {
        this.elements.status.textContent = status;
    }

    /**
     * Make the chat container visible
     */
    showContainer() {
        this.container.style.display = 'block';
    }

    /**
     * Scroll the conversation area to the bottom
     */
    scrollToBottom() {
        const element = this.elements.conversation;
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }

    /**
     * Format the current time as HH:MM
     * @param {Date} date - Date object to format
     * @returns {string} Formatted time string
     */
    formatTime(date) {
        return `${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}`;
    }

    /**
     * Pad a number with leading zero if needed
     * @param {number} val - Number to pad
     * @returns {string} Padded number as string
     */
    padZero(val) {
        return val < 10 ? `0${val}` : val.toString();
    }

    /**
     * Generate a random ID string
     * @returns {string} Random ID
     */
    generateRandomId() {
        return Math.random().toString(36).substring(2, 15) +
               Math.random().toString(36).substring(2, 15);
    }

    /**
     * Get the WebSocket URL based on the current location
     * @returns {string} WebSocket URL
     */
    getWebSocketUrl() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        const path = window.location.pathname.replace(/\/[^/]*$/, '');
        return `${protocol}//${host}${path}/chat`;
    }
}
