import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';
import { correctCounterIncrementing, correctInitValue } from 'utils/tests/forLoop';
import { correctCondition } from 'utils/tests/loops';

describe('Create Array - for', function () {
  ESLintTest(__dirname, '0b59e958-f471-4726-844c-4ba62df7e00c', 0.5);

  let task, forStatement, app, numbers, n;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    forStatement = task.statements.for[0];
    numbers = getVariable(app, 'numbers');
    n = getVariable(app, 'n');
  });

  describe(`For statement`, () => {
    RunTestCase(`Has correct init value`, 'a3c685b1-156e-4adb-839e-b83d0d7ce413', 0.5, () => {
      correctInitValue(forStatement, 1);
    });

    RunTestCase(`Has correct condition`, 'a3c685b1-156e-4adb-839e-b83d0d7ce413', 0.5, () => {
      correctCondition(forStatement, 'i <= n');
    });

    RunTestCase(`Is incrementing "i" variable by one`, 'a3c685b1-156e-4adb-839e-b83d0d7ce413', 0.5, () => {
      correctCounterIncrementing(forStatement);
    });
  });

  describe(`Array of numbers`, () => {
    RunTestCase(`Is filled with "i" values inside for statement`, '73928b74-7aea-40ed-9e34-a96eb296c6a0', 0.5, () => {
      expect(forStatement.body.variables?.numbers).toContainEntry(['pushedValues', ['i']]);
    });

    RunTestCase(`Variable "n" is greater then 0`, '73928b74-7aea-40ed-9e34-a96eb296c6a0', 0.5, () => {
      expect(n).toBeGreaterThan(0);
    });

    RunTestCase(`Final length equals "n" value`, '73928b74-7aea-40ed-9e34-a96eb296c6a0', 0.5, () => {
      expect(numbers).toBeArrayOfSize(n);
    });

    RunTestCase(`Contains correct numbers`, '73928b74-7aea-40ed-9e34-a96eb296c6a0', 0.5, () => {
      expect(numbers).toIncludeAllMembers([new Array(n)].map((_, index) => index + 1));
    });
  });
});
