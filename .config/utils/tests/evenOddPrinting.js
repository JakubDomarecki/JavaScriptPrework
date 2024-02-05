import * as _ from "lodash";

export const correctEvenOddPrinting = (statements) => {
  let isEvenCount = 0;
  let isOddCount = 0;

  statements.forEach((statement) => {
    const even = [
      { isConcatenated: true, value: `i + " - even"` },
      { expressions: ["i"], quasis: [" - even"] },
    ];
    const odd = [
      { isConcatenated: true, value: `i + " - odd"` },
      { expressions: ["i"], quasis: [" - odd"] },
    ];
    const errorMsg = `You printed wrong values according to specified condition.`;

    if (["i % 2 === 0", "i % 2 == 0"].includes(statement.condition)) {
      // console.log(statement.consequent.consoleLogs);
      expect(statement.consequent.consoleLogs, errorMsg).toIncludeAnyMembers(even);

      if (!_.isNull(statement.alternate)) {
        expect(statement.alternate.consoleLogs, errorMsg).toIncludeAnyMembers(odd);
        isOddCount++;
      }
      isEvenCount++;
    } else if (["i % 2 !== 0", "i % 2 != 0"].includes(statement.condition)) {
      expect(statement.consequent.consoleLogs, errorMsg).toIncludeAnyMembers(odd);

      if (!_.isNull(statement.alternate)) {
        expect(statement.alternate.consoleLogs, errorMsg).toIncludeAnyMembers(even);
        isEvenCount++;
      }

      isOddCount++;
    }
  });

  expect(isEvenCount, `You should have use "even condition" in if statement only once.`).toEqual(1);
  expect(isOddCount, `You should have use "odd condition" in if statement only once.`).toEqual(1);
};

export const correctIfConditions = (statements) => {
  const correctConditions = ["i % 2 === 0", "i % 2 !== 0", "i % 2 == 0", "i % 2 != 0"];
  expect(statements, "You have used wrong condition.").toSatisfyAll(({ condition }) =>
    correctConditions.includes(condition)
  );
};
