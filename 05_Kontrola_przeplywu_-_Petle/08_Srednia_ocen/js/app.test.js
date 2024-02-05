import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';
import 'console-testing-library';
import * as _ from 'lodash';

describe('Stars', function () {
  ESLintTest(__dirname, 'f0d01a6a-704a-4821-88c2-3ae188e715a9', 0.25);

  let app;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    result = getVariable(app, 'result');
  });

  describe(`Array of results`, () => {
    RunTestCase(`Final length equals 3 value`, '3b3fce16-979c-4cca-ac1f-7f2821422efd', 1, () => {
      expect(result).toBeArrayOfSize(3);
    });

    RunTestCase(`Contains correct numbers`, 'f0d01a6a-704a-4821-88c2-3ae188e715a9', 3.75, () => {
      expect(result).toIncludeAllMembers([
        'Średnia ocena z matematyki studenta Mateusz: 3.7',
        'Średnia ocena z matematyki studenta Beniamin: 3.4',
        'Średnia ocena z matematyki studenta Jacek: 5.2',
      ]);
    });
  });
});
