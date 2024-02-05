import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';
import { correctCounterIncrementing, correctInitValue } from 'utils/tests/whileLoop';
import { correctCondition } from 'utils/tests/loops';

describe('Create Array - while', function () {
  ESLintTest(__dirname, '8c7117b0-c6f4-4e15-a354-ed0fda7da28c', 0.1);

  let task, whileStatement, app, numbers, n, i;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    whileStatement = task.statements.while[0];
    numbers = getVariable(app, 'numbers');
    n = getVariable(app, 'n');
    i = getVariable(app, 'i');
  });

  describe(`While statement`, () => {
    RunTestCase(`Counter value has been prepared`, '8c7117b0-c6f4-4e15-a354-ed0fda7da28c', 0.9, () => {
      correctInitValue(task.variables?.i, 1);
    });

    RunTestCase(`Has correct condition`, '29e45494-6648-409b-bc41-6a977dab14c7', 0.3, () => {
      correctCondition(whileStatement, 'i <= n');
    });

    RunTestCase(`Is incrementing "i" variable by one`, '29e45494-6648-409b-bc41-6a977dab14c7', 0.2, () => {
      correctCounterIncrementing(whileStatement);
    });
  });

  describe(`Array of numbers`, () => {
    RunTestCase(`Is filled with "i" values inside for statement`, '8d797e9c-7b76-415c-9475-66157f3c8a6e', 0.1, () => {
      expect(whileStatement.body.variables?.numbers).toContainEntry(['pushedValues', ['i']]);
    });

    RunTestCase(`Variable "n" is greater then 0`, '8d797e9c-7b76-415c-9475-66157f3c8a6e', 0.2, () => {
      expect(n).toBeGreaterThan(0);
    });

    RunTestCase(`Final length equals "n" value`, '8d797e9c-7b76-415c-9475-66157f3c8a6e', 0.1, () => {
      expect(numbers).toBeArrayOfSize(n);
    });

    RunTestCase(`Contains correct numbers`, '8d797e9c-7b76-415c-9475-66157f3c8a6e', 0.1, () => {
      expect(numbers).toIncludeAllMembers([new Array(n)].map((value, index) => index + 1));
    });
  });
});
