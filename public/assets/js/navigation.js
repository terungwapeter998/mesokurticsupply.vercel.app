// assets/js/navigation.js

document.addEventListener("DOMContentLoaded", () => {
    const trigger = document.getElementById("menu-trigger");
    const drawer = document.getElementById("side-drawer");
    const overlay = document.getElementById("drawer-overlay");

    // toggle drawer
    function toggleDrawer() {
        drawer.classList.toggle("drawer-active");
        overlay.classList.toggle("overlay-active");
    }

    trigger?.addEventListener("click", toggleDrawer);
    overlay?.addEventListener("click", toggleDrawer);

    // LOAD MENU
    const slot = document.getElementById("menu-slot");

    if (slot) {
        fetch("./menu.html")
            .then(res => {
                if (!res.ok) throw new Error("menu not found");
                return res.text();
            })
            .then(html => {
                slot.innerHTML = html;
            })
            .catch(err => {
                slot.innerHTML = "<p style='color:red'>Menu failed to load</p>";
                console.error(err);
            });
    }
});