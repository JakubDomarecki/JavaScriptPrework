import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

describe('Max from array', function () {
  ESLintTest(__dirname, '5bd2b911-84b1-49de-a388-105b79425266', 0.5);

  let app, task, fn, randomNumbers, maxNumber, maxFromArray;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    randomNumbers = getVariable(app, 'randomNumbers');
    maxFromArray = getVariable(app, 'maxFromArray');
    maxNumber = [...randomNumbers].sort((a, b) => b - a)[0];
    fn = task.functions?.[0];
  });

  RunTestCase(`Function has been created`, '6cee536b-ddb3-40f9-bb9f-945d323bf97e', 0.5, () => {
    expect(maxFromArray, 'Probably you have not used proper name of function (printArray).').toBeFunction();
  });

  RunTestCase(`Function is taking parameter "numbers"`, '6cee536b-ddb3-40f9-bb9f-945d323bf97e', 0.25, () => {
    expect(fn.params).toEqual(['numbers']);
  });

  RunTestCase(`Function is using "return" keyword`, '6cee536b-ddb3-40f9-bb9f-945d323bf97e', 0.25, () => {
    expect(fn.void, `In this task you should use "return" keyword inside function.`).toBeFalse();
  });

  RunTestCase(`Function is returning correct value`, '6e15ad96-d567-49e9-9338-b0cd48cdaa2b', 1, () => {
    expect(maxFromArray(randomNumbers)).toEqual(maxNumber);
  });

  RunTestCase(`Result of function is saved in "result" variable`, '6e15ad96-d567-49e9-9338-b0cd48cdaa2b', 1.5, () => {
    expect(task.variables.result.value).toBe('maxFromArray(randomNumbers)');
  });

  RunTestCase(`Variable "result" is printed in console`, '6e15ad96-d567-49e9-9338-b0cd48cdaa2b', 0.5, () => {
    expect(task.variables.result.isLogged).toBeTrue();
  });
});
