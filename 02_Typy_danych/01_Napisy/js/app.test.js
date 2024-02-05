import { ESLintTest, getVariable, parse, rewire, RunTestCase } from 'utils';
import 'console-testing-library';

describe('Strings', function () {
  ESLintTest(__dirname, 'f4c24ad7-06c2-4668-8fd4-531672faacc8', 0.1);

  let app, task, greeting, technology, result;
  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    greeting = getVariable(app, 'greeting');
    technology = getVariable(app, 'technology');
    result = getVariable(app, 'result');
  });

  RunTestCase(`Variable "greeting" has value "Hello"`, 'f4c24ad7-06c2-4668-8fd4-531672faacc8', 0.1, () => {
    expect(greeting).toBe('Hello');
  });

  RunTestCase(`Variable "technology" has value "JS"`, 'f4c24ad7-06c2-4668-8fd4-531672faacc8', 0.1, () => {
    expect(technology).toBe('JS');
  });

  describe(`Variable "result"`, () => {
    RunTestCase(`Has value "Hello JS"`, 'f4c24ad7-06c2-4668-8fd4-531672faacc8', 0.2, () => {
      expect(result).toBe('Hello JS');
    });

    RunTestCase(`Is result of used template literals`, '9cf23128-a9d5-40f1-ad7f-22d4da839d2e', 1, () => {
      expect(task.variables.result.value).toBe('${greeting} ${technology}');
    });

    RunTestCase(`Is printed`, '7a2fcb77-99a7-4587-a68b-797385f1b77a', 0.5, () => {
      expect(task.variables.result.isLogged).toBeTrue();
    });
  });
});
