import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

describe('Create 2D array of numbers', function () {
  ESLintTest(__dirname, '9552a58b-bd87-4dd7-ad9d-66fb73284e81', 0.5);

  let rows, columns, app, numbers, task;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    numbers = getVariable(app, 'numbers');
    rows = getVariable(app, 'rows');
    columns = getVariable(app, 'columns');
  });

  RunTestCase(`Variables "row" and "columns" are not modified`, 'a8181231-2290-4f05-9a6e-4dcfef61c3d9', 0.25, () => {
    expect(rows).toEqual(5);
    expect(columns).toEqual(4);
  });

  describe(`Variable "numbers"`, () => {
    RunTestCase(`Contains correct amount of rows`, '88cfa7ee-b7aa-41ca-a78d-55c7bd33bf2b', 0.5, () => {
      expect(numbers.length).toEqual(rows);
    });

    RunTestCase(`Each row contains correct amount of columns`, '88cfa7ee-b7aa-41ca-a78d-55c7bd33bf2b', 0.5, () => {
      expect(numbers).toSatisfyAll((x) => x.length === columns);
    });

    RunTestCase(`Is filled with correct numbers`, '88cfa7ee-b7aa-41ca-a78d-55c7bd33bf2b', 0.5, () => {
      expect(numbers).toEqual([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
        [17, 18, 19, 20],
      ]);
    });
  });

  RunTestCase(`Loop (for/while) statements were used`, '0b3d5868-9894-4948-9fbd-c90a162de10f', 1, () => {
    const rowsLoop = [...task.statements.for, ...task.statements.while];
    const columnsLoop = [...rowsLoop[0]?.body.statements.for, ...rowsLoop[0]?.body.statements.while];

    expect(rowsLoop, 'You have to use for or while statement to create rows.').toBeArrayOfSize(1);
    expect(columnsLoop, 'You have to use for or while statement to create columns.').toBeArrayOfSize(1);
  });
});
