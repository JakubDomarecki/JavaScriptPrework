import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

describe('Display information from an array', function () {
  ESLintTest(__dirname, '55025b37-50d1-4af1-8032-d9889914771d', 0.25);

  let app, result;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    result = getVariable(app, 'result');
  });

  describe(`Array of people`, () => {
    RunTestCase(`Final length equals 7 value`, '1013e37e-e947-426d-ad73-148e08313f62', 1, () => {
      expect(result).toBeArrayOfSize(3);
    });

    RunTestCase(`Contains correct numbers`, 'd8a6aa7f-8925-43ee-b0b6-fffd591cfe90', 2.75, () => {
      expect(result).toIncludeAllMembers([
        'Bartek Malinowski - wiek 35 lat',
        'Maria Zielonka - wiek 40 lat',
        'Adam Kwiatkowski - wiek 45 lat',
      ]);
    });
  });
});
