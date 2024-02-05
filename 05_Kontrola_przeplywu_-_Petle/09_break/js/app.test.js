import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

describe('break', function () {
  ESLintTest(__dirname, '16f6e612-ad59-4340-9809-4df869410d43', 0.1);

  let i, app, task, whileStatement, ifStatement;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    i = getVariable(app, 'i');
    whileStatement = task.statements.while[0];
    ifStatement = whileStatement.body.statements.if[0];
  });

  RunTestCase(`Variable "i" is not modified`, 'f848c4f3-7fd2-413d-97e1-597cb882b58e', 0.1, () => {
    expect(task.variables.i.value).toEqual(0);
  });

  RunTestCase(`While statement was used`, 'f848c4f3-7fd2-413d-97e1-597cb882b58e', 0.1, () => {
    expect(whileStatement, 'You have to use while statement in this task.').toBeObject();
  });

  RunTestCase(`Correct condition in loop`, '549a3c1b-2981-4dfd-93da-4d323b1cc35e', 0.35, () => {
    expect(ifStatement.condition).toEqual('i === 5');
  });

  RunTestCase(`Used break statement`, 'd319e39a-e40a-4835-a0aa-e38880906e9e', 0.15, () => {
    expect(ifStatement.consequent.statements.break).toBeArray();
  });

  RunTestCase(`Final value of "i" equals 5`, 'd319e39a-e40a-4835-a0aa-e38880906e9e', 0.2, () => {
    expect(i).toEqual(5);
  });
});
