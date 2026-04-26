// js/state.js

/**
 * Stage 6 Deterministic State Management
 * Purpose: Ensure every state transition is logged with a hash for audit integrity.
 */

const AppState = {
    identity: {
        user: null,
        sessionID: crypto.randomUUID(),
    },
    inventory: [],
    auditTrail: [] // The deterministic ledger
};

/**
 * Helper to generate a simple hash for the audit trail
 * In a production environment, we use SHA-256 via the Web Crypto API.
 */
async function generateAuditHash(action, data) {
    const msgUint8 = new TextEncoder().encode(action + JSON.stringify(data) + Date.now());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function dispatch(action, payload) {
    const timestamp = new Date().toISOString();
    const hash = await generateAuditHash(action, payload);

    // Update State
    if (action === 'SET_USER') AppState.identity.user = payload;

    // Record to Ledger
    const entry = { timestamp, action, payload, hash };
    AppState.auditTrail.push(entry);

    console.log(`[AUDIT] Action: ${action} | Hash: ${hash.substring(0, 8)}...`);
    return AppState;
}

export const getState = () => ({ ...AppState });