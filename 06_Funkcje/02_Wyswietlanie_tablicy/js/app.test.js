import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';
import * as _ from 'lodash';
import 'console-testing-library';

const printArray = DEV_MODE ? require('../../solution/js/app') : require('./app');

describe('Print an array', function () {
  ESLintTest(__dirname, 'ef86ea78-7d10-4d6f-8f17-cb8495022acb', 0.25);

  let app, task, fn, forStatement, people, log;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    people = getVariable(app, 'people');
    fn = task.functions?.[0];
    forStatement = fn.body.statements.for?.[0];
  });

  RunTestCase(`Function has been created`, '824d9d7e-0375-4d9e-a57c-a30d4d063ef4', 0.6, () => {
    expect(printArray, 'Probably you have not used proper name of function (printArray).').toBeFunction();
  });

  RunTestCase(`Function is taking parameter "array"`, '824d9d7e-0375-4d9e-a57c-a30d4d063ef4', 0.2, () => {
    expect(fn.params).toEqual(['array']);
  });

  RunTestCase(`Function is not using "return" keyword`, '824d9d7e-0375-4d9e-a57c-a30d4d063ef4', 0.2, () => {
    expect(fn.void, `In this task you should print (console.log) data instead of returning it.`).toBeTrue();
  });

  RunTestCase(
    `For statement inside function is operating on "array" variable`,
    'ff437906-dfe8-4cc6-b6d5-9ab8ded2a3d2',
    0.5,
    () => {
      expect(forStatement, 'You have not used for statement inside function.').toBeObject();
      expect(forStatement.test, `You have to use "array" variable inside function.`).toContain('array');
    }
  );

  RunTestCase(`Console output is showing list of names`, 'ff437906-dfe8-4cc6-b6d5-9ab8ded2a3d2', 0.5, () => {
    expect(
      forStatement.body.variables.array,
      `You have not used "array" variable inside console.log method.`
    ).toBeObject();
    expect(forStatement.body.variables.array.isLogged).toIncludeSameMembers(['array[i]']);

    if (_.isFunction(printArray)) {
      printArray(people);
    }

    expect(_.flattenDeep(console.log.mock.calls)).toEqual(people);
  });
});
