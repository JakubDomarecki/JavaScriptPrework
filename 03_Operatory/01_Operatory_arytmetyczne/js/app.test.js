import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';

describe('Arithmetic operators', function () {
  ESLintTest(__dirname, '6053d41a-c906-4f4e-a1a6-aa1b1ef7433f', 0.2);

  let app, task, johnAge, aliceAge, bobAge, ageSum, ageModulo, ageDivide, ageOperations;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    johnAge = getVariable(app, 'johnAge');
    aliceAge = getVariable(app, 'aliceAge');
    bobAge = getVariable(app, 'bobAge');
    ageSum = getVariable(app, 'ageSum');
    ageModulo = getVariable(app, 'ageModulo');
    ageDivide = getVariable(app, 'ageDivide');
    ageOperations = getVariable(app, 'ageOperations');
  });

  RunTestCase(`Variable "johnAge" has value 25`, '9d360618-e7ad-4262-b679-42a4e91a7564', 0.2, () => {
    expect(johnAge).toBe(25);
  });

  RunTestCase(`Variable "aliceAge" has value 30`, '9d360618-e7ad-4262-b679-42a4e91a7564', 0.2, () => {
    expect(aliceAge).toBe(30);
  });

  RunTestCase(`Variable "bobAge" has value 17`, '9d360618-e7ad-4262-b679-42a4e91a7564', 0.2, () => {
    expect(bobAge).toBe(17);
  });

  RunTestCase(
    `Variable "ageSum" is sum of "johnAge" and "aliceAge" and is logged`,
    '38036623-0e99-4216-8448-6b1db0dfddcf',
    0.8,
    () => {
      expect(ageSum).toBe(55);
      expect(task.variables.ageSum.value).toBe('johnAge + aliceAge');
      expect(task.variables.ageSum.isLogged, 'You have to use console.log.').toBe(true);
    }
  );

  RunTestCase(
    `Variable "ageModulo" is the remainder of dividing "aliceAge" by "johnAge" and is logged`,
    '5facedc3-0018-4f91-a11c-12592539e3f8',
    0.8,
    () => {
      expect(ageModulo).toBe(5);
      expect(task.variables.ageModulo.value).toBe('aliceAge % johnAge');
      expect(task.variables.ageModulo.isLogged, 'You have to use console.log.').toBe(true);
    }
  );

  RunTestCase(
    `Variable "ageDivide" is dividing of "aliceAge" by "bobAge" and is logged`,
    '546fbc05-0823-48a5-9248-58fb65b5de7f',
    0.8,
    () => {
      expect(ageDivide).toBe(1.7647058823529411);
      expect(task.variables.ageDivide.value).toBe('aliceAge / bobAge');
      expect(task.variables.ageDivide.isLogged, 'You have to use console.log.').toBe(true);
    }
  );

  RunTestCase(
    `Variable "ageOperations" is result of multiplying "ageSum" by "ageModulo" and is logged`,
    '0d05b845-ebad-4d9b-a892-e4ee0d7a2652',
    0.8,
    () => {
      expect(ageOperations).toBe(275);
      expect(task.variables.ageOperations.value).toBe('ageSum * ageModulo');
      expect(task.variables.ageOperations.isLogged, 'You have to use console.log.').toBe(true);
    }
  );
});
