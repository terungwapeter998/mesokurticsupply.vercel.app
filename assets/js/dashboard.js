/**
 * MESOKURTIC DASHBOARD ENGINE (PRODUCTION READY)
 * State-driven Ops UI controller (no framework dependency)
 */

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // SAFETY GUARDS
    // =========================
    const required = {
        menuTrigger: document.getElementById("menu-trigger"),
        drawer: document.getElementById("side-drawer"),
        overlay: document.getElementById("drawer-overlay")
    };

    if (!required.menuTrigger || !required.drawer || !required.overlay) {
        console.error("Dashboard UI bootstrap failed: missing core elements");
        return;
    }

    const { menuTrigger, drawer, overlay } = required;

    // =========================
    // STATE ENGINE
    // =========================
    let isOpen = false;

    const openDrawer = () => {
        isOpen = true;

        drawer.classList.add("drawer-active");
        overlay.classList.add("overlay-active");

        drawer.setAttribute("aria-hidden", "false");
        menuTrigger.setAttribute("aria-expanded", "true");
        overlay.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    };

    const closeDrawer = () => {
        isOpen = false;

        drawer.classList.remove("drawer-active");
        overlay.classList.remove("overlay-active");

        drawer.setAttribute("aria-hidden", "true");
        menuTrigger.setAttribute("aria-expanded", "false");
        overlay.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
    };

    const toggleDrawer = () => {
        isOpen ? closeDrawer() : openDrawer();
    };

    // =========================
    // EVENT BINDING
    // =========================
    menuTrigger.addEventListener("click", toggleDrawer);
    overlay.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) {
            closeDrawer();
        }
    });

    // =========================
    // OPTIONAL: DASHBOARD HEALTH CHECK
    // =========================
    console.log("Dashboard engine initialized");
});