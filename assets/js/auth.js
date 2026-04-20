/**
 * MESOKURTIC AUTH SYSTEM (PRODUCTION READY - FRONTEND ONLY)
 * Role-based login gate for SaaS dashboard
 * NOTE: This is UI-layer auth only. Must be backed by server in real production.
 */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (!form || !emailInput || !passwordInput) return;

    // =========================
    // ROLE MODEL (STATIC DEMO)
    // Replace with backend auth later
    // =========================
    const USERS = [
        {
            email: "admin@mesokurtic.com",
            password: "admin123",
            role: "admin"
        },
        {
            email: "ops@mesokurtic.com",
            password: "ops123",
            role: "dispatcher"
        },
        {
            email: "driver@mesokurtic.com",
            password: "driver123",
            role: "driver"
        },
        {
            email: "client@mesokurtic.com",
            password: "client123",
            role: "client"
        }
    ];

    // =========================
    // SESSION ENGINE
    // =========================
    const setSession = (user) => {
        sessionStorage.setItem("ms_user", JSON.stringify(user));
    };

    const getSession = () => {
        return JSON.parse(sessionStorage.getItem("ms_user"));
    };

    // =========================
    // LOGIN HANDLER
    // =========================
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const user = USERS.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) {
            alert("Invalid credentials");
            return;
        }

        setSession({
            email: user.email,
            role: user.role,
            loginTime: Date.now()
        });

        // =========================
        // ROLE ROUTING
        // =========================
        switch (user.role) {
            case "admin":
                window.location.href = "dashboard.html";
                break;

            case "dispatcher":
                window.location.href = "operations.html";
                break;

            case "driver":
                window.location.href = "operations.html";
                break;

            case "client":
                window.location.href = "analytics.html";
                break;

            default:
                window.location.href = "index.html";
        }
    });


    // DEBUG
    // =========================
    console.log("Auth system initialized");
});