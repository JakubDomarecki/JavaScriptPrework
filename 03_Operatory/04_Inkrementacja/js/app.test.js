import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

describe('Incrementing', function () {
  ESLintTest(__dirname, '42c35f92-6e1d-4ee4-802f-d032d341f428', 0.1);

  let app, task, finalValue;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    finalValue = getVariable(app, 'finalValue');
  });

  RunTestCase(`Variable "startValue" has assigned value 10`, '9f100ed6-d7a3-4d75-8271-1917ad87dbf3', 0.2, () => {
    expect(task.variables.startValue.assignedValue).toBe(10);
  });

  RunTestCase(`Variable "startValue" has been incremented`, '9f100ed6-d7a3-4d75-8271-1917ad87dbf3', 0.4, () => {
    expect(task.variables.startValue.usedExpressions).toIncludeSameMembers([
      {
        name: 'startValue',
        prefix: false,
        operator: '++',
      },
    ]);
  });

  RunTestCase(
    `Variable "finalValue" is copy of "startValue" and has value of 11 and is logged`,
    '08b08159-b3b1-4bdb-8027-bb6f88e22b8e',
    0.3,
    () => {
      expect(finalValue).toBe(11);
      expect(task.variables.finalValue.assignedValue).toBe('startValue');
      expect(task.variables.finalValue.isLogged, 'You have to use console.log.').toBeTrue();
    }
  );
});
