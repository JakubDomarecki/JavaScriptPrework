import { ESLintTest, RunTestCase, parse } from 'utils';

describe('Letter grade', function () {
  ESLintTest(__dirname, '3e1d8114-f247-4db2-abd5-15b4d59d07d4', 0.5);

  let task, switchStatement;

  beforeAll(() => {
    task = parse(__dirname);
    switchStatement = task.statements.switch[0];
  });

  RunTestCase('Switch statement is used', '9e28874c-af2e-4ea1-80a4-96241f5638de', 0.25, () => {
    expect(switchStatement).toBeDefined();
  });

  RunTestCase(`Switch is using "grade" variable`, 'ebd6b58c-31c8-4b54-af39-66aadddcedf8', 0.5, () => {
    expect(switchStatement.discriminant).toBe('grade');
  });

  RunTestCase('Cases printing correct values', '394f89b7-99e3-4444-b364-a60382314f09', 1, () => {
    const valuesFromConsoleLogs = switchStatement.cases.map((el) => [el.test, el.consequent.consoleLogs[0]]);
    expect(valuesFromConsoleLogs).toIncludeSameMembers([
      [6, 'A'],
      [5, 'B'],
      [4, 'C'],
      [3, 'D'],
      [2, 'E'],
      [1, 'F'],
    ]);
  });

  RunTestCase(`Used "break" statement in every case`, '394f89b7-99e3-4444-b364-a60382314f09', 0.75, () => {
    const isUsedBreak = (el) => el.consequent.statements.break.length === 1;
    expect(switchStatement.cases, `You have missed some "break" statement.`).toSatisfyAll(isUsedBreak);
  });
});
