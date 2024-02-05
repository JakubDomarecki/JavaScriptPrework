import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

describe('Arrays with names', () => {
  ESLintTest(__dirname, '8bda207e-480a-4948-8ebf-51e58e71497b', 0.3);

  let app, task;
  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
  });

  describe('Part 1', () => {
    RunTestCase('Array "users" is defined and filled with names', 'd354d39d-99ff-4885-a83d-a054ee5901a4', 1, () => {
      const v = getVariable(app, 'users');
      const expected = ['John', 'Marie', 'Kate', 'Paul', 'Steven'];
      expect(v).toIncludeSameMembers(expected);
    });

    RunTestCase('Second element of array is printed', 'f2d03fa7-68d9-4b7a-a3d9-a541975f691d', 0.2, () => {
      expect(task.variables?.users?.isLogged).toContain('users[1]');
    });

    RunTestCase('Fifth element of array is printed', 'f2d03fa7-68d9-4b7a-a3d9-a541975f691d', 0.2, () => {
      expect(task.variables?.users?.isLogged).toContain('users[4]');
    });

    RunTestCase('Length of array is printed', 'f2d03fa7-68d9-4b7a-a3d9-a541975f691d', 0.2, () => {
      expect(task.variables?.users?.isLogged, 'You have to use length property of an array.').toContain('users.length');
    });
  });

  describe('Part 2', () => {
    RunTestCase('Array "guests" is defined and is empty', 'c2a37d69-9db0-4c47-b60c-de3190bca2e8', 0.25, () => {
      expect(task.variables?.guests?.value).toBeArrayOfSize(0);
    });

    RunTestCase('Names added one-by-one with push method', 'bfa67040-38dc-489c-88f9-65d537143814', 1.25, () => {
      const expected = ['Chauncey', 'Ling', 'Ona', 'Nicole', 'Michaele'];
      expect(task.variables?.guests?.pushedValues, 'You have to use push method.').toIncludeSameMembers(expected);
    });

    RunTestCase('First element of array is printed', 'e7233cb2-2138-4768-8d76-9c413d930096', 0.2, () => {
      expect(task.variables?.guests?.isLogged).toContain('guests[0]');
    });

    RunTestCase('Third element of array is printed', 'e7233cb2-2138-4768-8d76-9c413d930096', 0.2, () => {
      expect(task.variables?.guests?.isLogged).toContain('guests[2]');
    });

    RunTestCase('Length of array is printed', 'e7233cb2-2138-4768-8d76-9c413d930096', 0.2, () => {
      expect(task.variables?.guests?.isLogged, 'You have to use length property of an array.').toContain(
        'guests.length'
      );
    });
  });
});
