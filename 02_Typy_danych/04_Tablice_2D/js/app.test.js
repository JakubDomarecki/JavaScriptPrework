import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

describe('2D arrays', function () {
  ESLintTest(__dirname, 'd2c228e5-3518-4841-9752-9bfeb0a3e249', 0.1);

  let app, task;
  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
  });

  describe('Part 1', () => {
    RunTestCase(
      'Array "numbers" is defined and filled with numbers',
      'd2c228e5-3518-4841-9752-9bfeb0a3e249',
      0.9,
      () => {
        const v = getVariable(app, 'numbers');
        const expected = [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
        ];
        expect(v).toIncludeSameMembers(expected);
      }
    );

    RunTestCase(
      'Second element from first row of array is printed',
      '56e0d768-b218-4757-8fdc-fb97ba737b47',
      0.2,
      () => {
        expect(task.variables?.numbers?.isLogged).toContain('numbers[0][1]');
      }
    );

    RunTestCase('Second row of array is printed', '56e0d768-b218-4757-8fdc-fb97ba737b47', 0.2, () => {
      expect(task.variables?.numbers?.isLogged).toContain('numbers[1]');
    });

    RunTestCase('Length of third row of array is printed', '56e0d768-b218-4757-8fdc-fb97ba737b47', 0.1, () => {
      expect(task.variables?.numbers?.isLogged, 'You have to use length property of an array.').toContain(
        'numbers[2].length'
      );
    });
  });

  describe('Part 2', () => {
    RunTestCase(
      'Array "mixedValues" is defined and filled with names and numbers',
      '360d94a5-e713-4e56-b72a-32cddf3d9f0b',
      1,
      () => {
        const v = getVariable(app, 'mixedValues');
        const expected = [
          ['Keli', 'Walter', 'Heriberto'],
          [1, 2, 3, 4, 5, 6],
        ];
        expect(v).toIncludeSameMembers(expected);
      }
    );

    RunTestCase('Third element from first row of array is printed', '90507cd0-fa78-4678-80a2-bf194c5d0daf', 0.2, () => {
      expect(task.variables?.mixedValues?.isLogged).toContain('mixedValues[0][2]');
    });

    RunTestCase(
      'Fifth element from second row of array is printed',
      '90507cd0-fa78-4678-80a2-bf194c5d0daf',
      0.2,
      () => {
        expect(task.variables?.mixedValues?.isLogged).toContain('mixedValues[1][4]');
      }
    );

    RunTestCase('Length of second row of array is printed', '90507cd0-fa78-4678-80a2-bf194c5d0daf', 0.1, () => {
      expect(task.variables?.mixedValues?.isLogged, 'You have to use length property of an array.').toContain(
        'mixedValues[1].length'
      );
    });
  });
});
