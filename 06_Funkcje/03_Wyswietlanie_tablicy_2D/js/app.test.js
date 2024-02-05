import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';
import * as _ from 'lodash';
import 'console-testing-library';

const print2DArray = DEV_MODE ? require('../../solution/js/app') : require('./app');

describe('Print an 2D array', function () {
  ESLintTest(__dirname, '8a7ad36a-86b0-4431-8072-15c1164d626f', 0.5);

  let app, task, fn, outerForStatement, users, innerForStatement;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    users = getVariable(app, 'users');
    fn = task.functions?.[0];
    outerForStatement = fn.body.statements.for?.[0];
    innerForStatement = outerForStatement.body.statements.for?.[0];
  });

  RunTestCase(`Function has been created`, '7b9e89ee-0c68-4c68-849e-ed87d9371aa0', 0.5, () => {
    expect(print2DArray, 'Probably you have not used proper name of function (printArray).').toBeFunction();
  });

  RunTestCase(`Function is taking parameter "array"`, '7b9e89ee-0c68-4c68-849e-ed87d9371aa0', 0.25, () => {
    expect(fn.params).toEqual(['array']);
  });

  RunTestCase(`Function is not using "return" keyword`, '7b9e89ee-0c68-4c68-849e-ed87d9371aa0', 0.25, () => {
    expect(fn.void, `In this task you should print (console.log) data instead of returning it.`).toBeTrue();
  });

  RunTestCase(
    `Outer for statement inside function is operating on "array" variable`,
    '389b6f3c-18c1-4205-a4bf-d1aa984f9b71',
    0.75,
    () => {
      expect(outerForStatement, 'You have not used for statement inside function.').toBeObject();
      expect(outerForStatement.test, `You have to use "array" variable inside function.`).toContain('array');
    }
  );

  RunTestCase(
    `Inner for statement inside function is operating on "array" variable`,
    '389b6f3c-18c1-4205-a4bf-d1aa984f9b71',
    0.75,
    () => {
      expect(innerForStatement.test, `You have to use "array" variable inside function.`).toContain('array');
    }
  );

  RunTestCase(`Console output is showing list of names`, '389b6f3c-18c1-4205-a4bf-d1aa984f9b71', 0.5, () => {
    expect(
      innerForStatement.body.variables.array,
      `You have not used "array" variable inside console.log method.`
    ).toBeObject();
    expect(innerForStatement.body.variables.array.isLogged).toIncludeSameMembers(['array[i][j]']);

    if (_.isFunction(print2DArray)) print2DArray(users);
    expect(_.flattenDeep(console.log.mock.calls)).toEqual(_.flatten(users));
  });
});
