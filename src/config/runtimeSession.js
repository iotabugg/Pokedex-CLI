let session = null;

export function initSession() {
    session= {
        lastPokemon: null
    }
    return session;
}

export function getSession() {
    return session
}