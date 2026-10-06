function studentLogin() {
    const name = document.getElementById("studentName").value.trim();
    const id = document.getElementById("studentId").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    const students = [
        { name: "Vedanti", id: "SC2026-001", password: "1234" },
        { name: "Student2", id: "SC2026-002", password: "1234" },
        { name: "Student3", id: "SC2026-003", password: "1234" }
    ];

    const student = students.find(s =>
        s.name.toLowerCase() === name.toLowerCase() &&
        s.id === id &&
        s.password === password
    );

    if (student) {
        localStorage.setItem("studentName", student.name);
        localStorage.setItem("studentId", student.id);
        window.location.href = "dashboard.html";
    } else {
        message.textContent = "Invalid Student Name, ID or Password.";
        message.style.color = "#b42318";
    }
}

function registerEvent(eventName) {
    const message = document.getElementById("eventMessage");
    message.textContent = "✅ Registration successful for " + eventName + "!";
}

const lostFoundForm = document.getElementById("lostFoundForm");

if (lostFoundForm) {

    const reportedItems = document.getElementById("reportedItems");

    function displayReports() {

        const reports =
            JSON.parse(localStorage.getItem("lostFoundReports")) || [];

        reportedItems.innerHTML = "";

        if (reports.length === 0) {
            reportedItems.innerHTML = `
                <div class="card">
                    <p>No reports submitted yet.</p>
                </div>
            `;
            return;
        }

        reports.forEach(function(report) {

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${report.status === "Lost Item" ? "🔴" : "🟢"} ${report.status}</h3>

                <p><strong>Item:</strong> ${report.itemName}</p>

                <p><strong>📍 Location:</strong> ${report.location}</p>

                <p><strong>📝 Description:</strong> ${report.description}</p>

                <p><strong>📞 Contact:</strong> ${report.contact}</p>

                <p class="small">
                    Reported on: ${report.date}
                </p>
            `;

            reportedItems.appendChild(card);
        });
    }


    lostFoundForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const status =
            document.getElementById("itemStatus").value;

        const itemName =
            document.getElementById("itemName").value.trim();

        const location =
            document.getElementById("itemLocation").value.trim();

        const description =
            document.getElementById("itemDescription").value.trim();

        const contact =
            document.getElementById("contactNumber").value.trim();

        const message =
            document.getElementById("lostFoundMessage");


        const newReport = {
            status: status,
            itemName: itemName,
            location: location,
            description: description,
            contact: contact,
            date: new Date().toLocaleString()
        };


        const reports =
            JSON.parse(localStorage.getItem("lostFoundReports")) || [];

        reports.unshift(newReport);

        localStorage.setItem(
            "lostFoundReports",
            JSON.stringify(reports)
        );


        message.textContent =
            "✅ " + status + " report submitted successfully!";

        lostFoundForm.reset();

        displayReports();
    });


    displayReports();
}
function showTour(place) {
    const message = document.getElementById("tourMessage");
    message.textContent = "📍 " + place + " selected. More campus information will be displayed here.";
}
const feedbackForm = document.getElementById("feedbackForm");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("feedbackName").value.trim();
        const type = document.getElementById("feedbackType").value;
        const message = document.getElementById("feedbackMessage");

        message.textContent =
            "✅ Thank you, " + name + "! Your " + type.toLowerCase() +
            " has been submitted successfully.";

        feedbackForm.reset();
    });
}
const surveyForm = document.getElementById("surveyForm");

if (surveyForm) {
    surveyForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const message = document.getElementById("surveyMessage");

        message.textContent =
            "✅ Thank you! Your survey response has been recorded successfully.";

        surveyForm.reset();
    });
}