import { ESLintTest, getVariable, parse, rewire, RunTestCase } from 'utils';

describe('Variables', function () {
  ESLintTest(__dirname, '2d3d03d9-a81d-4770-bff8-17ee8e1ec465', 0.2);

  let app, task;
  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
  });

  const cases = [
    { type: 'number', variable: 'numberValue', expectFn: 'toBeNumber', id: '8ad77f78-74a7-4e76-ba34-30e6513783a4' },
    { type: 'string', variable: 'stringValue', expectFn: 'toBeString', id: '5a37b7b9-0cef-44ba-87cc-47dab244b0bd' },
    {
      type: 'string',
      variable: 'mixedValue',
      expectFn: 'toBeString',
      id: 'c4058031-2335-49a1-8e5f-08489fbe1a7e',
      nextTest: function () {
        RunTestCase('Template literals is used', 'c4058031-2335-49a1-8e5f-08489fbe1a7e', 0.3, () => {
          expect(task.variables.mixedValue.value, 'You should use template literals for merging two values.').toBe(
            '${2}two'
          );
        });
      },
    },
    { type: 'boolean', variable: 'logicValue', expectFn: 'toBeBoolean', id: '7f23e861-848e-4aeb-8073-5e599543cefc' },
    { type: 'object', variable: 'nullValue', expectFn: 'toBeNull', id: '5aa30656-f623-451e-bbbb-149eb2d64f48' },
  ];

  cases.forEach(({ type, variable, expectFn, nextTest, id }) => {
    describe(`Variable "${variable}"`, () => {
      RunTestCase(`Is ${type}`, id, 0.1, () => {
        const v = getVariable(app, variable);
        expect(v)[expectFn]();
      });

      RunTestCase('Is printed', id, 0.1, () => {
        expect(task.variables?.[variable]?.isLogged, `You have to print "${variable}" using console.log.`).toBeTrue();
      });

      RunTestCase('Is checked type with typeof', id, 0.2, () => {
        expect(
          task.variables?.[variable]?.isUsedTypeOf,
          `You have to check and print (console.log) type of "${variable}" with typeof expression.`
        ).toBeTrue();
      });

      if (typeof nextTest === 'function') {
        nextTest();
      }
    });
  });
});
