const themeButton = document.getElementById("themeButton");
const dateInput = document.getElementById("jumpToDate");
const nameInput = document.getElementById("activityName");
const categoryInput = document.getElementById("activityCategory");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const startTimeInput = document.getElementById("startTime");
const logButton = document.getElementById("logButton");
const formMessage = document.getElementById("formMessage");
const activityList = document.getElementById("activityList");
const totalTasks = document.getElementById("totalTasks");
const totalTime = document.getElementById("totalTime");
const efficiency = document.getElementById("efficiency");
const savedTheme = localStorage.getItem("theme");
let taskCount = 0;
let totalMinutes = 0;
let productiveMinutes = 0;

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "Light Mode";
}

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeButton.textContent = "Dark Mode";
        localStorage.setItem("theme", "light");
    }
});

logButton.addEventListener("click", function () {
    const activityName = nameInput.value.trim();
    const activityDate = dateInput.value;
    const category = categoryInput.value;
    const hours = Number(hoursInput.value);
    const minutes = Number(minutesInput.value);
    const startTime = startTimeInput.value;

    if (activityName === "" || activityDate === "" || startTime === "") {
        formMessage.textContent = "Please fill all fields.";
        return;
    }

    if (hours < 0 || minutes < 0 || (hours === 0 && minutes === 0)) {
        formMessage.textContent = "Please enter a valid time.";
        return;
    }

    formMessage.textContent = "";

    if (activityList.querySelector(".empty-item")) {
        activityList.innerHTML = "";
    }

    const listItem = document.createElement("li");
    const title = document.createElement("p");
    const details = document.createElement("p");
    const currentMinutes = (hours * 60) + minutes;

    title.className = "activity-title";
    details.className = "activity-details";

    title.textContent = activityName;
    details.textContent = category + " | " + hours + "h " + minutes + "m | " + startTime + " | " + activityDate;

    listItem.appendChild(title);
    listItem.appendChild(details);
    activityList.appendChild(listItem);

    taskCount = taskCount + 1;
    totalMinutes = totalMinutes + currentMinutes;

    if (category === "Deep Work") {
        productiveMinutes = productiveMinutes + currentMinutes;
    } else {
        productiveMinutes = productiveMinutes + (currentMinutes / 2);
    }

    totalTasks.textContent = taskCount;
    totalTime.textContent = Math.floor(totalMinutes / 60) + "h " + (totalMinutes % 60) + "m";
    efficiency.textContent = Math.round((productiveMinutes / totalMinutes) * 100) + "%";

    nameInput.value = "";
    hoursInput.value = "";
    minutesInput.value = "";
    startTimeInput.value = "";
});
