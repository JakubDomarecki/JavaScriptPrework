import { ESLintTest, RunTestCase, parse } from 'utils';

describe('Exam score', function () {
  ESLintTest(__dirname, 'ecf4134d-57f7-4fb2-8a35-70564bc29acf', 0.25);

  const examPassedMsg = 'Exam passed';
  const examFailedMsg = 'Exam failed';
  const conditionGreaterThan = 'studentScore > passingScore';
  const conditionSmallerThan = 'passingScore < studentScore';

  let task, isConditionGreaterThan;

  beforeAll(() => {
    task = parse(__dirname);
    isConditionGreaterThan = task.statements.if[0].condition === conditionGreaterThan;
  });

  RunTestCase(`If statement is used`, '22f25e32-27c8-4aeb-b718-2376ebc45a10', 0.25, () => {
    expect(task.statements.if[0], 'You have to use if statement.').toBeDefined();
  });

  RunTestCase(`If statement contains correct condition`, '325279e2-c9ec-4065-92c5-b2b213766f9c', 1.5, () => {
    expect(task.statements.if[0], 'Provided condition is wrong.').toContainAnyValues([
      conditionGreaterThan,
      conditionSmallerThan,
    ]);
  });

  RunTestCase(`"Exam passed" is printed in correct place`, '78921d96-6434-49be-996f-7679af52d0d4', 0.5, () => {
    expect(task.statements.if[0].consequent, `You should place console.log inside true if block`).toContainEntry([
      'consoleLogs',
      [isConditionGreaterThan ? examPassedMsg : examFailedMsg],
    ]);
  });

  RunTestCase(`"Exam failed" is printed in correct place`, '78921d96-6434-49be-996f-7679af52d0d4', 0.5, () => {
    expect(task.statements.if[0].alternate, `You should place console.log inside false if block`).toContainEntry([
      'consoleLogs',
      [isConditionGreaterThan ? examFailedMsg : examPassedMsg],
    ]);
  });
});
