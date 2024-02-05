import { ESLintTest, RunTestCase, getVariable, parse, rewire } from 'utils';
import { correctCounterIncrementing, correctInitValue } from 'utils/tests/forLoop';
import { correctCondition } from 'utils/tests/loops';
import { correctEvenOddPrinting, correctIfConditions } from 'utils/tests/evenOddPrinting';

describe('Even and Odd - for', function () {
  ESLintTest(__dirname, 'b368e118-ba5a-41bf-bbff-2f006dc29673', 0.5);

  let task, forStatement, app, n, ifStatements;

  beforeAll(() => {
    app = rewire(__dirname);
    task = parse(__dirname);
    forStatement = task.statements.for[0];
    n = getVariable(app, 'n');
    ifStatements = forStatement.body.statements.if;
  });

  describe(`For statement`, () => {
    RunTestCase(`Has correct init value`, 'a89ecefd-c057-4730-ab16-1edd050967ec', 0.5, () => {
      correctInitValue(forStatement, 0);
    });

    RunTestCase(`Has correct condition`, 'a89ecefd-c057-4730-ab16-1edd050967ec', 0.5, () => {
      correctCondition(forStatement, 'i <= n');
    });

    RunTestCase(`Is incrementing "i" variable by one`, 'a89ecefd-c057-4730-ab16-1edd050967ec', 0.5, () => {
      correctCounterIncrementing(forStatement);
    });
  });

  RunTestCase(`If statement/s is/are inside for statement`, '688f7d5b-1381-48d1-8e43-8cea1655ac92', 0.5, () => {
    expect(forStatement.body.statements.if.length).toBeGreaterThan(0);
  });

  RunTestCase(`If statement has correct condition`, '688f7d5b-1381-48d1-8e43-8cea1655ac92', 0.5, () => {
    correctIfConditions(ifStatements);
  });

  RunTestCase(`Correct values are printed`, 'da37b38b-6e92-4d7a-bddf-5b56652eba25', 0.5, () => {
    correctEvenOddPrinting(ifStatements);
  });
});
