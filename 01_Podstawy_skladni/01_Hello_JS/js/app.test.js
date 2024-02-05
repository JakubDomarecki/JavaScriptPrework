import { ESLintTest, RunTestCase, importTaskFile } from 'utils';
import 'console-testing-library';

describe('Hello JS', function () {
  ESLintTest(__dirname, '407b69e0-1b7b-44c0-9583-5b4b67525156', 0.1);

  RunTestCase("console.log is printing 'Hello JS'", 'f7592117-20c0-40e8-8971-43c0bd55ee21', 0.9, () => {
    importTaskFile(__dirname, 'app.js');
    expect(console.log).toHaveBeenCalledWith('Hello JS');
    expect(console.log).toHaveBeenCalledTimes(1);
  });
});
