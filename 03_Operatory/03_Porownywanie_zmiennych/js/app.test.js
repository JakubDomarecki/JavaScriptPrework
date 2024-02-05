import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

describe('Variables comparison', function () {
  ESLintTest(__dirname, '080b8f1c-117c-4830-b5b6-2ab7d0de8502', 0.1);

  let app, task, numberAsNumber, numberAsString, equalValueAndType, equalValue;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    numberAsNumber = getVariable(app, 'numberAsNumber');
    numberAsString = getVariable(app, 'numberAsString');
    equalValueAndType = getVariable(app, 'equalValueAndType');
    equalValue = getVariable(app, 'equalValue');
  });

  RunTestCase(
    `Variables "numberAsNumber" and "numberAsString" have correct initial values`,
    'd986ad41-58bc-4530-9e38-426de45d9c5d',
    0.1,
    () => {
      expect(numberAsNumber).toBe(12);
      expect(numberAsString).toBe('12');
    }
  );

  RunTestCase(`Variable "equalValueAndType" has value false`, '72c0d274-c12e-4bb4-953f-0910159d394a', 0.3, () => {
    expect(equalValueAndType).toBeFalse();
    expect(task.variables.equalValueAndType.value, 'You have used wrong comparison operator.').toIncludeMultiple([
      'numberAsNumber',
      '===',
      'numberAsString',
    ]);
  });

  RunTestCase(`Variable "equalValueAndType" is logged`, 'c3faa79a-23bd-40fb-87fd-1949e6be9327', 0.1, () => {
    expect(task.variables.equalValueAndType.isLogged, 'You have to use console.log.').toBeTrue();
  });

  RunTestCase(`Variable "equalValue" has value true`, '67d22bf7-f455-45c9-b458-d0c272e57bbf', 0.3, () => {
    expect(equalValue).toBeTrue();
    expect(task.variables.equalValue.value, 'You have used wrong comparison operator.').toIncludeMultiple([
      'numberAsNumber',
      '==',
      'numberAsString',
    ]);
  });

  RunTestCase(`Variable "equalValue" is logged`, '396468b3-2d7d-4798-8f43-b7817afe939f', 0.1, () => {
    expect(task.variables.equalValue.isLogged, 'You have to use console.log.').toBeTrue();
  });
});
