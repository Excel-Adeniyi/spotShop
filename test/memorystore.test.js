const session = require('express-session');
const { MemoryStore } = require('express-session');

test('Retrieve CSRF token from MemoryStore', () => {
    const memoryStore = new MemoryStore();
    const sessionId = 'test-session-id';
    const csrfToken = 'test-csrf-token';
    const sessionData = { csrfToken: csrfToken };

    // Store the session data in the MemoryStore
    memoryStore.sessions[sessionId] = JSON.stringify(sessionData);

    // Retrieve the stored session
    const storedSession = JSON.parse(memoryStore.sessions[sessionId]);

    // Retrieve the CSRF token from the stored session
    const retrievedCsrfToken = storedSession.csrfToken;
    console.log(storedSession)
    // Perform assertions
    expect(retrievedCsrfToken).toEqual(csrfToken);
});
