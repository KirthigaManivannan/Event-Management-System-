// Global variables
let events = [];

// Fetch the username from the JWT token and display it
const token = localStorage.getItem("token");
if (token) {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decoding JWT token
    const username = decoded.username || "User"; // Assuming username is in the token
    document.getElementById("username").textContent = username;
}

// Initialize the FullCalendar
$(document).ready(function () {
    $("#calendar").fullCalendar({
        header: {
            left: "prev,next today",
            center: "title",
            right: "month,agendaWeek,agendaDay",
        },
        editable: true,
        events: events,
        eventClick: function (event) {
            showEventDetails(event);
        },
    });
});

// Toggle the event creation form
function toggleEventForm() {
    const eventForm = document.getElementById("event-form");
    eventForm.style.display = eventForm.style.display === "block" ? "none" : "block";
}

// Submit a new event
function submitEvent() {
    const title = document.getElementById("event-title").value;
    const description = document.getElementById("event-description").value;
    const dateTime = document.getElementById("event-datetime").value;

    if (!title || !description || !dateTime) {
        alert("Please fill in all fields.");
        return;
    }

    const newEvent = {
        title: title,
        description: description,
        start: dateTime,
    };

    events.push(newEvent);
    $("#calendar").fullCalendar("renderEvent", newEvent, true);
    alert("Event added successfully!");

    // Clear the form
    document.getElementById("event-title").value = "";
    document.getElementById("event-description").value = "";
    document.getElementById("event-datetime").value = "";
    toggleEventForm();
}

// Show event details and RSVP options
function showEventDetails(event) {
    document.getElementById("event-title-details").textContent = event.title;
    document.getElementById("event-description-details").textContent = event.description;
    document.getElementById("event-date-details").textContent = `Event Date: ${moment(event.start).format("YYYY-MM-DD HH:mm")}`;

    document.getElementById("event-details").style.display = "block";
}

// RSVP to an event
function rsvp(response) {
    if (response) {
        alert("You have RSVPed Yes.");
    } else {
        alert("You have RSVPed No.");
    }
    document.getElementById("event-details").style.display = "none";
}

// Logout the user
function logout() {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    window.location.href = "auth.html";
}
