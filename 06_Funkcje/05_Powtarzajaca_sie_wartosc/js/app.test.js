import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

const f = (a) => {
  for (let i = 0; i < a.length; i++) if (a.indexOf(a[i], i + 1) > 0) return i;
};

describe('Repeated values', function () {
  ESLintTest(__dirname, '33c8013c-1628-43dc-bb36-388ca725e023', 0.5);

  let app, task, fn, array, indexOfRepeatedValue, repeatedValueIndex;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    array = getVariable(app, 'numbers');
    indexOfRepeatedValue = getVariable(app, 'indexOfRepeatedValue');
    repeatedValueIndex = f(array);
    fn = task.functions?.[0];
  });

  RunTestCase(`Function has been created`, 'e77af58e-02f5-49d8-be62-a135607fb8ad', 0.5, () => {
    expect(indexOfRepeatedValue, 'Probably you have not used proper name of function (printArray).').toBeFunction();
  });

  RunTestCase(`Function is taking parameter "array"`, 'e77af58e-02f5-49d8-be62-a135607fb8ad', 0.25, () => {
    expect(fn.params).toEqual(['array']);
  });

  RunTestCase(`Function is using "return" keyword`, 'e77af58e-02f5-49d8-be62-a135607fb8ad', 0.25, () => {
    expect(fn.void, `In this task you should use "return" keyword inside function.`).toBeFalse();
  });

  RunTestCase(`Inside function is declared "firstIndex" variable`, '695e8a2d-30f7-48ea-80a8-95b2b24778fb', 0.5, () => {
    expect(fn.body.variables?.firstIndex).toBeObject();
  });

  RunTestCase(`Function is returning correct value`, '09f6de18-ba47-4696-85f1-2ce49debcbf3', 2.5, () => {
    expect(indexOfRepeatedValue(array)).toEqual(repeatedValueIndex);
  });

  RunTestCase(`Variable "firstIndex" is printed in console`, '09f6de18-ba47-4696-85f1-2ce49debcbf3', 0.5, () => {
    expect(fn.body.variables?.firstIndex.isLogged).toBeTrue();
  });
});
