import { ESLintTest, RunTestCase, getVariable, importTaskFile, parse, rewire } from 'utils';
import { correctCounterIncrementing, correctInitValue } from 'utils/tests/forLoop';
import { correctCondition } from 'utils/tests/loops';
import 'console-testing-library';
import * as _ from 'lodash';

describe('Print 2D array of numbers', function () {
  ESLintTest(__dirname, 'ed0db5e6-8f50-4215-80ee-22e3547345b0', 0.1);

  let task, outerForStatement, innerForStatement, app, numbers;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    outerForStatement = task.statements.for[0];
    innerForStatement = outerForStatement.body.statements.for[0];
    numbers = getVariable(app, 'numbers');
  });

  // Test Outer For Loop
  describe(`Outer for statement`, () => {
    RunTestCase(`Has correct init value`, 'ed0db5e6-8f50-4215-80ee-22e3547345b0', 0.2, () => {
      correctInitValue(outerForStatement, 0);
    });

    RunTestCase(`Has correct condition`, 'ed0db5e6-8f50-4215-80ee-22e3547345b0', 0.2, () => {
      correctCondition(
        outerForStatement,
        'i < numbers.length',
        `You should operate between "i" and total length of "numbers" array exclusively(!), because array is indexed from "0", it's last index is one smaller than total length.`
      );
    });

    RunTestCase(`Is incrementing "i" variable by one`, 'ed0db5e6-8f50-4215-80ee-22e3547345b0', 0.2, () => {
      correctCounterIncrementing(outerForStatement);
    });
  });

  // Test Inner For Loop
  describe(`Inner for statement`, () => {
    RunTestCase(`Has correct init value`, 'ed0db5e6-8f50-4215-80ee-22e3547345b0', 0.2, () => {
      correctInitValue(innerForStatement, 0, 'j');
    });

    RunTestCase(`Has correct condition`, 'ed0db5e6-8f50-4215-80ee-22e3547345b0', 0.2, () => {
      correctCondition(
        innerForStatement,
        'j < numbers[i].length',
        `You should operate between "j" and total length of "numbers[i]" array exclusively(!), because array is indexed from "0", it's last index is one smaller than total length.`
      );
    });

    RunTestCase(`Is incrementing "j" variable by one`, 'ed0db5e6-8f50-4215-80ee-22e3547345b0', 0.2, () => {
      correctCounterIncrementing(innerForStatement, 'j');
    });
  });

  RunTestCase(`Variable "numbers" is not modified`, 'ed0db5e6-8f50-4215-80ee-22e3547345b0', 0.3, () => {
    expect(numbers).toBeArrayOfSize(3);
    expect(numbers).toEqual([
      [16, 32, 2048],
      [64, 256, 1024],
      [8, 2, 4],
    ]);
  });

  RunTestCase(`console.log is used inside for statements`, 'ed0db5e6-8f50-4215-80ee-22e3547345b0', 0.2, () => {
    expect(innerForStatement.body.variables.numbers.isLogged[0]).toBe('numbers[i][j]');
  });

  RunTestCase(`console.log output is showing numbers from 1 to 9`, 'ed0db5e6-8f50-4215-80ee-22e3547345b0', 0.2, () => {
    importTaskFile(__dirname);
    expect(console.log).toHaveBeenCalledTimes(9);
    expect(_.flatten(console.log.mock.calls)).toEqual([16, 32, 2048, 64, 256, 1024, 8, 2, 4]);
  });
});
