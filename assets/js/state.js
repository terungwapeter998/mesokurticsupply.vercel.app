/**
 * MESOKURTIC STATE ENGINE (PRODUCTION READY)
 * Centralized UI + Session State Manager
 * Used across: index, login, dashboard, operations, analytics
 */

const MS_STATE = (() => {

    // =========================
    // INTERNAL STATE
    // =========================
    let state = {
        user: null,
        drawerOpen: false
    };

    // =========================
    // LOAD SESSION
    // =========================
    const loadUser = () => {
        try {
            const raw = sessionStorage.getItem("ms_user");
            state.user = raw ? JSON.parse(raw) : null;
        } catch (e) {
            state.user = null;
        }
    };

    // =========================
    // SAVE SESSION
    // =========================
    const saveUser = (user) => {
        state.user = user;
        sessionStorage.setItem("ms_user", JSON.stringify(user));
    };

    // =========================
    // CLEAR SESSION
    // =========================
    const clearUser = () => {
        state.user = null;
        sessionStorage.removeItem("ms_user");
    };

    // =========================
    // AUTH HELPERS
    // =========================
    const isAuthenticated = () => {
        return state.user !== null;
    };

    const getRole = () => {
        return state.user?.role || null;
    };

    // =========================
    // ROLE PROTECTION (CLIENT SIDE GUARD)
    // =========================
    const requireRole = (allowedRoles = []) => {
        loadUser();

        if (!state.user) {
            window.location.href = "login.html";
            return false;
        }

        if (allowedRoles.length && !allowedRoles.includes(state.user.role)) {
            window.location.href = "index.html";
            return false;
        }

        return true;
    };

    // =========================
    // DRAWER STATE
    // =========================
    const setDrawer = (open) => {
        state.drawerOpen = open;
    };

    const isDrawerOpen = () => state.drawerOpen;

    // =========================
    // INIT
    // =========================
    const init = () => {
        loadUser();
        console.log("STATE ENGINE INITIALIZED");
    };

    return {
        init,
        saveUser,
        clearUser,
        isAuthenticated,
        getRole,
        requireRole,
        setDrawer,
        isDrawerOpen,
        loadUser
    };

})();
// 
// Auto-init on load
document.addEventListener("DOMContentLoaded", MS_STATE.init);