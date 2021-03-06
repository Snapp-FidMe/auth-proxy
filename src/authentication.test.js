import assert from 'assert';
import { Authentication } from './authentication';
import { Config } from './config';

Config.url = 'http://localhost:3000';

describe('Authentication', () => {
  describe('authenticate', () => {
    it('should not authenticate with wrong data', async () => {
      const authManager = new Authentication();
      const authenticated = await authManager.authenticate('wrong@email.com', 'wrongpassword');
      assert(authenticated === false);
    });

    xit('should authenticate with correct data', async () => {
      const authManager = new Authentication();
      const authenticated = await authManager.authenticate('correct@email.fr', 'correctpassword');
      assert(authenticated === true);
    });
  });

  describe('permissions', () => {
    xit('should return the permission object', async () => {
      const authManager = new Authentication();
      const authenticated = await authManager.authenticate('correct@email.fr', 'correctpassword');
      assert(authManager.permissions);
    });
  })

  describe('isAuthenticated', () => {
    xit('should return true if a user is authenticated', async () => {
      const authManager = new Authentication();
      const authenticated = await authManager.authenticate('correct@email.fr', 'correctpassword');
      assert(await authManager.isAuthenticated());
    });

    it('should return false if a user is not authenticated', async () => {
      const authManager = new Authentication();
      authManager.logout();
      assert(!(await authManager.isAuthenticated()));
    });
  });

  describe('logout', () => {
    xit('should allow user to logout', async () => {
      const authManager = new Authentication();
      const authenticated = await authManager.authenticate('correct@email.fr', 'correctpassword');
      assert(await authManager.isAuthenticated());
      authManager.logout();
      assert(!(await authManager.isAuthenticated()));
    });
  });

  describe('getHeaders', () => {
    it('should return correct http headers', async () => {
      const authManager = new Authentication();
      assert.deepEqual(
        authManager.getHeaders('endpoint'),
        { uid: null, client: null, 'access-token': null, 'token-type': 'Bearer', 'x-api-endpoint': 'endpoint' }
      );
      assert.deepEqual(
        authManager.getHeaders('lol'),
        { uid: null, client: null, 'access-token': null, 'token-type': 'Bearer', 'x-api-endpoint': 'lol' }
      );
    });
  });
});

