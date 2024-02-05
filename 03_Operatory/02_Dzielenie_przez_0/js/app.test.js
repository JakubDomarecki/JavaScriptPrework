import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

describe('Dividing by zero', function () {
  ESLintTest(__dirname, '9bd7f34e-b634-47c4-a3d3-f42c9bcd60ce', 0.1);

  let app, task, divideByZero;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    divideByZero = getVariable(app, 'divideByZero');
  });

  RunTestCase(`Variable "divideByZero" has value Infinity`, 'f2ac07f8-f24d-4da9-b72e-0e19d1da3305', 0.3, () => {
    expect(divideByZero).toBe(Infinity);
    expect(task.variables.divideByZero.value).toBe('3 / 0');
  });

  RunTestCase(`Variable "divideByZero" is logged`, '04aac032-dd33-421e-aa5c-25095453d4de', 0.1, () => {
    expect(task.variables.divideByZero.isLogged).toBeTrue();
  });
});
