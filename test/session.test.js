const { pool, sessionStore } = require('../config/db.config');
const { v4: uuid } = require('uuid');

describe('UUID Session Storage Test', () => {
  beforeAll((done) => {
    sessionStore.onReady()
      .then(() => {
        console.log('MySQLStore ready');
        done();
      })
      .catch((error) => {
        console.error(error);
        done(error);
      });
  }, 20000); // Increase the timeout value to 10000 ms (10 seconds)

  afterAll((done) => {
    pool.end((error) => {
      if (error) {
        console.error(error);
        done(error);
      } else {
        console.log('MySQL pool connection closed');
        done();
      }
    });
  }, 10000); // Increase the timeout value to 10000 ms (10 seconds)

  it('should save the UUID to the database', (done) => {
    // Create a mock session
    const session = {
      csrfToken: 'mock-csrf-token',
    };

    // Generate a session ID using UUID
    const sessionId = uuid();

    // Save the session using the sessionStore and the generated session ID
    sessionStore.set(sessionId, session, (error) => {
      if (error) {
        done(error);
        return;
      }

      // Retrieve the session from the database
      sessionStore.get(sessionId, (error, retrievedSession) => {
        if (error) {
          done(error);
          return;
        }

        // Check if the retrieved session has the correct UUID
        expect(retrievedSession).toBeDefined();
        expect(retrievedSession.csrfToken).toBe('mock-csrf-token');
        done();
      });
    });
  });
});
