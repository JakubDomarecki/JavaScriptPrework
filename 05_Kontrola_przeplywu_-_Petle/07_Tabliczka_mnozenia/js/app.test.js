import { ESLintTest, RunTestCase, getVariable, importTaskFile, parse, rewire } from 'utils';
import 'console-testing-library';
import * as _ from 'lodash';

describe('Multiplication table', function () {
  ESLintTest(__dirname, 'c6716dd5-0f9f-4ac2-b393-0771b1f977f0', 0.1);

  let n, resultCalc, resultLog, app, calc, task;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    n = getVariable(app, 'n');
    calc = getVariable(app, 'calc');

    resultCalc = new Array(n)
      .fill([])
      .map((row, i) => new Array(n).fill([]).map((column, j) => i + 1 + ' x ' + (j + 1) + ' = ' + (i + 1) * (j + 1)));

    resultLog = resultCalc.map((v) => v.join(' | '));
  });

  RunTestCase(`Starting variables are not modified`, 'c6716dd5-0f9f-4ac2-b393-0771b1f977f0', 1.4, () => {
    expect(n).not.toBeLessThan(3);
    expect(task.variables.calc.value).toEqual([]);
  });

  describe(`Variable "calc"`, () => {
    RunTestCase(`Contains correct amount of rows`, '0ec6432f-674b-4a9c-babd-23ce34a507cd', 0.3, () => {
      expect(calc.length).toEqual(n);
    });

    RunTestCase(`Each row contains correct amount of elements`, '0ec6432f-674b-4a9c-babd-23ce34a507cd', 0.3, () => {
      expect(calc).toSatisfyAll((x) => x.length === n);
    });

    RunTestCase(`Is filled with correct values`, '0ec6432f-674b-4a9c-babd-23ce34a507cd', 0.3, () => {
      expect(calc).toSatisfyAll(
        (x, i) => x.every((y, j) => y === resultCalc[i][j]),
        `Some elements in "calc" array are wrong.`
      );
    });
  });

  RunTestCase(`Loop (for/while) statements were used`, '0ec6432f-674b-4a9c-babd-23ce34a507cd', 0.3, () => {
    const rowsLoop = [...task.statements.for, ...task.statements.while];
    const columnsLoop = [...rowsLoop[0]?.body.statements.for, ...rowsLoop[0]?.body.statements.while];
    expect([...rowsLoop, ...columnsLoop], 'You have to use for or while statement in this task.').toBeArray();
  });

  RunTestCase(`Used console.log prints correct result`, '0ec6432f-674b-4a9c-babd-23ce34a507cd', 0.3, () => {
    importTaskFile(__dirname);
    expect(_.flattenDeep(console.log.mock.calls), `Every row need to be printed separately.`).toIncludeAnyMembers(
      resultLog
    );
  });
});
