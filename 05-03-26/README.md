# JavaScript Event Handling & Monitoring Tasks

This project demonstrates different **JavaScript event handling and monitoring scenarios** commonly used in modern web applications.

The tasks include events such as **click, keyboard input, mouse hover, double click, right-click prevention, logging, analytics tracking, and performance monitoring**.

---

# Task 1 – E-Commerce Add to Cart Button

### Scenario

In an online shopping website, when the user clicks the **Add to Cart** button, the product should be added to the cart and a confirmation message should be displayed.

### Event Used

`click`

### Functionality

* Detects button click
* Displays confirmation message on screen
* Logs message in browser console

---

# Task 2 – Login Form Keyboard Event

### Scenario

When a user presses the **Enter key** inside the username field, the login form submission should be triggered.

### Event Used

`keydown`

### Functionality

* Detects keyboard input
* Checks if the pressed key is **Enter**
* Displays alert message
* Logs login attempt in console

---

# Task 3 – Secure Banking App Right Click Disable

### Scenario

For security purposes, a banking website disables **right-click functionality** to prevent copying or accessing sensitive information.

### Event Used

`contextmenu`

### Functionality

* Detects right-click event
* Prevents default browser context menu
* Displays warning in console

---

# Task 4 – Customer Support Chat Mouse Hover

### Scenario

A website displays a tooltip message when the user hovers over the **Chat Support icon**.

### Event Used

`mouseover`

### Functionality

* Detects mouse hover on chat icon
* Displays help message for customer support
* Logs hover activity in console

---

# Task 5 – Double Click to Like Product

### Scenario

Similar to social media applications, users can **double-click a product image to like it**.

### Event Used

`dblclick`

### Functionality

* Detects double-click on product image
* Increases like counter
* Displays updated like count on screen

---

# Task 6 – Track User Login Activity

### Scenario

Developers log user login attempts for monitoring and security purposes.

### Functionality

* Captures username entered by the user
* Logs login attempt information
* Sends the log data to the logging system

### Example Code

```html
<input id="username" placeholder="Enter Username">
<button onclick="login()">Login</button>

<script>
function login(){
const user = document.getElementById("username").value;
logger.log("INFO","User Login Attempt",{username:user});
}
</script>
```

---

# Task 7 – Log Form Validation Errors

### Scenario

If a user enters invalid data in a form, developers log the issue for debugging.

### Functionality

* Reads email input
* Checks email format
* Logs warning if email is invalid
* Displays alert to the user

### Example Code

```javascript
function validateForm(){

const email = document.getElementById("email").value;

if(!email.includes("@")){
logger.log("WARN","Invalid Email Entered",email);
alert("Invalid email");
}

}
```

---

# Task 8 – Track Button Click Analytics

### Scenario

Web applications track which buttons users click to analyze user behavior.

### Functionality

* Detects which button is clicked
* Logs user interaction
* Helps developers analyze user engagement

### Example Code

```html
<button onclick="trackClick('Buy Now')">Buy Now</button>
<button onclick="trackClick('Add Wishlist')">Add Wishlist</button>

<script>
function trackClick(action){
logger.log("INFO","User Action",action);
}
</script>
```

---

# Task 9 – Monitor Page Load Performance

### Scenario

Developers measure how long a webpage takes to load to improve performance.

### Functionality

* Captures page load start time
* Calculates total page load duration
* Logs performance data

### Example Code

```javascript
const start = performance.now();

window.onload = function(){

const end = performance.now();

const loadTime = end - start;

logger.log("INFO","Page Load Time",loadTime + " ms");

}
```

---

# Technologies Used

* HTML5
* JavaScript
* DOM Event Handling
* Browser Developer Console
* Performance Monitoring API

---

# Learning Outcome

Through this project we learned how to:

* Handle different JavaScript events
* Track user interactions
* Log application activities
* Monitor performance metrics
* Implement analytics for web applications

These techniques are widely used in modern web applications to build **interactive, secure, and performance-optimized systems**.
