import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

describe('Objects', function () {
  ESLintTest(__dirname, 'dee42753-7674-4c95-838e-219eb545cbe7', 0.1);

  let app, task, car, color, referenceColor;
  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    car = getVariable(app, 'car');
    color = getVariable(app, 'color');
    referenceColor = getVariable(app, 'referenceColor');
  });

  describe('Car', () => {
    RunTestCase('Is an object', 'dee42753-7674-4c95-838e-219eb545cbe7', 0.3, () => {
      expect(car).toBeObject();
    });

    RunTestCase('Contains "type" property with "sedan" value', 'dee42753-7674-4c95-838e-219eb545cbe7', 0.4, () => {
      expect(car).toContainEntry(['type', 'sedan']);
    });

    RunTestCase('Contains "color" property with "green" value', 'dee42753-7674-4c95-838e-219eb545cbe7', 0.4, () => {
      expect(car).toContainEntry(['color', 'green']);
    });

    RunTestCase('Contains "engine" property with "2.5" value', 'dee42753-7674-4c95-838e-219eb545cbe7', 0.4, () => {
      expect(car).toContainEntry(['engine', 2.5]);
    });

    RunTestCase('carDescription is concatenating car properties', '2af11746-745c-4102-80fc-8211ece84bdc', 0.5, () => {
      expect(task.variables.carDescription.isConcatenated).toBe(true);
      expect(task.variables.carDescription.value).toEqual('car.type + " " + car.color + " " + car.engine');
    });

    RunTestCase('carDescription is logged', '2af11746-745c-4102-80fc-8211ece84bdc', 0.5, () => {
      expect(task.variables.carDescription.isLogged).toBe(true);
    });
  });

  describe('Colors', () => {
    RunTestCase('Color is an object', 'e7049e1e-5f23-41ec-a087-78ac08d56883', 0.4, () => {
      expect(color).toBeObject();
    });

    RunTestCase('Reference Color is the same object as color', 'e7049e1e-5f23-41ec-a087-78ac08d56883', 0.4, () => {
      expect(referenceColor).toBeObject();
      expect(task.variables.referenceColor.isReference).toBe(true);
      expect(task.variables.referenceColor.value).toEqual('color');
    });

    RunTestCase('Contains "red" property with 100 value', 'e7049e1e-5f23-41ec-a087-78ac08d56883', 0.4, () => {
      expect(task.variables.color.value).toContainEntry(['red', 100]);
      expect(referenceColor).toContainEntry(['red', 50]);
    });

    RunTestCase('Contains "green" property with 0 value', 'e7049e1e-5f23-41ec-a087-78ac08d56883', 0.4, () => {
      expect(task.variables.color.value).toContainEntry(['green', 0]);
      expect(referenceColor).toContainEntry(['green', 50]);
    });

    RunTestCase('Contains "blue" property with 50 value', 'e7049e1e-5f23-41ec-a087-78ac08d56883', 0.4, () => {
      expect(task.variables.color.value).toContainEntry(['blue', 50]);
    });
  });
});
