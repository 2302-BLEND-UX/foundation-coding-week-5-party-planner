const go = document.getElementById("go");
const budget = document.getElementById("budget");
const people = document.getElementById("people");
const result = document.getElementById("result");
const statusMessage = document.getElementById("status");

// Animation - AOS
AOS.init();

// this function will check the user data, and return either true or false based on whether they have entered something into both inputs
function validateData(userdata) {
    // check if either inputs are empty, at the time of clicking the go button
    if (userdata.people === "" || userdata.budget === "") {
        statusMessage.innerHTML = "Please enter both fields.";
        return false;
    } else {
        statusMessage.innerHTML = "";
        return true;
    }
}

// this function will render our available events on the screen
function displayEvents(events, people) {
    for (let i = 0; i < events.length; i++) {
        // rename our events[i] to event for mroe readability
        let event = events[i];
        // update the result div
        result.innerHTML += `
        <div class="card" data-aos="zoom-out-down">
        <img src="${event.img}"
            alt="">
        <h3>${event.name}</h3>
        <p>People: ${event.minPeople} - ${event.maxPeople}</p>
        <p>Cost per person: ${event.costPerPerson}</p>
        <p class="total-cost">Total cost: $${people * event.costPerPerson}</p>
    </div>
        `
    }
}

function findEvents(userdata) {
    // clear result/clear all the events
    result.innerHTML = "";
    // create an array to store all of our available events, based on our budget and people
    let eventsToShow = [];
    // loop through our data to pick out the events or activities we can do
    for (let i = 0; i < activities.length; i++) {
        // rename our activity for ease of use
        let activity = activities[i];
        // establish the full cost of this activity
        let totalCost = userdata.people * activity.costPerPerson;
        // check our math is correct
        // console.log("Total cost of " + activity.name + " is: " + totalCost);

        // check all our conditions match this event
        if (userdata.budget >= totalCost && userdata.people >= activity.minPeople && userdata.people <= activity.maxPeople) {
            // if they do, push this event to our container array
            eventsToShow.push(activity);
        }
    }
    // this is the end of the loop
    // show the events, from the array containing all our available events
    displayEvents(eventsToShow, userdata.people);
}

go.addEventListener("click", function () {
    event.preventDefault();
    // collect our data
    let userdata = {
        people: people.value,
        budget: budget.value
    }

    // declare a variable which will let the user proceed if the inputs are entered
    let validated = validateData(userdata);
    // if validated is true, find some events
    if (validated) {
        findEvents(userdata);
    }

})

// Activity: show in the statusMessage how many results are on the screen

// E.g. "3 events found!"

// Activity 2: Show in the statusMessage a message if no events were found.

// E.g. "No events found!"