import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

describe('Create an array', function () {
  ESLintTest(__dirname, '1889b196-5586-4cd1-824a-fb70d3ab56db', 0.5);

  let app, task, createArray;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    createArray = getVariable(app, 'createArray');
  });

  RunTestCase(`Function has been created`, '2cd5bd75-4484-459f-82eb-50180bb3716c', 1, () => {
    expect(createArray, 'Probably you have not used proper name of function (createArray).').toBeFunction();
  });

  RunTestCase(`Function is taking parameter "rows"`, '2cd5bd75-4484-459f-82eb-50180bb3716c', 0.5, () => {
    expect(task.functions[0]?.params).toEqual(['rows']);
  });

  RunTestCase(`Result of function is array of numbers from 1 to 5`, '3e2c471a-0693-4e4a-8976-c8d47e742406', 1, () => {
    const r = createArray(5);
    const c = new Array(5).fill(0).map((_, i) => i + 1);
    expect(r).toEqual(c);
  });

  RunTestCase(`Function is using "return" keyword`, '3e2c471a-0693-4e4a-8976-c8d47e742406', 0.5, () => {
    expect(task.functions[0]?.void, `You have not used "return" inside function.`).toBeFalse();
  });
});
