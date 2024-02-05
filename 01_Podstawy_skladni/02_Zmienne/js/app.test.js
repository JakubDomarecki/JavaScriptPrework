import { ESLintTest, RunTestCase, parse, getVariable, rewire } from 'utils';

describe('Variables', () => {
  ESLintTest(__dirname, '647e1fb1-e771-42d4-bb81-ab42450487b7', 0.1);

  let app, task;
  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
  });

  const cases = [{ variable: 'a' }, { variable: 'b' }, { variable: 'c' }];

  cases.forEach(({ variable }) => {
    RunTestCase(`Variable "${variable}" is defined`, '0ead5171-05ef-4c3e-9150-4cd2dbebcb2c', 0.15, () => {
      const v = getVariable(app, variable);
      expect(v, `You have to define "${variable}" variable.`).toBeDefined();
    });

    RunTestCase(`Variable "${variable}" is  printed`, '66a11f78-79e9-47b1-b918-67216571ad41', 0.15, () => {
      const v = getVariable(app, variable);
      expect(task.variables[variable].isLogged, `You have to print "${variable}" using console.log.`).toBeTrue();
    });
  });
});
