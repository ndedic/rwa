document.addEventListener("DOMContentLoaded", function () {
	var username = prompt("Please enter your username to start chatting");
	createChatClient({
		username: username,
		container: document.getElementById("chat-container")
	});
});


//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
function randomString() {    	
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function scrollToBottom(element){
   element.scrollTop = element.scrollHeight - element.clientHeight;
}

function showContainer(container) {
	container.style.display = "block";
}

function createChatClient(params) {
	'use strict';
	
	var username = params.username;
	var container = params.container;
	
	var wsUrl = "ws://localhost:8080/lv12/chat";
	var userId = "user-" + randomString();
	var elements = {        
		conversation: container.querySelector("#conversation"),
		message: container.querySelector("#text"),
		send: container.querySelector("#send"),		
		status: container.querySelector("#status")
	};

	showContainer(container);
	
	var client = new WebSocket(wsUrl);    

	client.onopen = function (event) {
		showStatus("Connected" + " [" + username + "]");
    };
 
    client.onmessage = function (event) {    	
    	var message = JSON.parse(event.data);
    	console.log("Message received", message);
    	if (message.userId != userId) {
    		displayMessage(message);	
    	}		
    };
 
    elements.send.onclick = function (event) {
    	if (elements.message.value == "") {
    		return;
    	}
        sendMessage(elements.message.value);
        elements.message.value = "";
    };
    
    elements.message.addEventListener("keyup", function(event) {  
      if (event.keyCode === 13) {    
        event.preventDefault(); 
        elements.send.click();
      }
    });
 
    function sendMessage(text) {
    	var message = {
            username: username,
			userId: userId,
			text: text
		};    	
        client.send(JSON.stringify(message));
        displayMessage(message);
    }
    
    function pad(val) {
    	var str = val.toString();
    	return str.length == 1 ? "0"+str : str;
    }
 
    function displayMessage(message) {
    	var date = new Date();
    	var time = pad(date.getHours()) + ":" + pad(date.getMinutes());
    	var msgTxt = "<b>" + message.username + "</b> " + time + "<br/>";
    	msgTxt += message.text;
    	msgTxt += "<br/>";
        elements.conversation.innerHTML += msgTxt;
        scrollToBottom(elements.conversation);
    }
    
    function showStatus(status) {
    	elements.status.innerHTML = status;
    }
}
