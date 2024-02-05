import { ESLint } from "eslint";
import path from "path";
import { getTaskFileInString, parse } from "./ast";
import rewireLib from "rewire";
import { forLoopTest } from "./tests/forLoop";
import {idSplitCharset as _joinCharset, pointsSplitCharset as _pointSplitCharset} from "./JestReporters/SplitCharset";
import { UUIDv4 } from 'uuid-v4-validator'

/**
 * @DEV_MODE: In dev mode files are taken from solution directory
 * @function taskDirectory: returns dir for task prod/dev
 */
global.DEV_MODE = process.env.DEV_MODE || false;
global.taskDirectory = () => (DEV_MODE ? "../../solution/js" : "");

/**
 * ESLint tesk testing
 * @param dirname
 * @param criteriaId
 * @param points
 * @param filename
 * @constructor
 */
const ESLintTest = (dirname, criteriaId, points, filename = "app.js") => {
  RunTestCase("ESLint", criteriaId, points, async function () {
    const eslint = new ESLint();
    const results = await eslint.lintFiles([path.join(dirname, taskDirectory(), filename)]);
    const formatter = await eslint.loadFormatter("codeframe");
    const resultText = formatter.format(results);

    results.forEach(({ messages }) => {
      if (messages.length > 0) {
        throw new Error(resultText);
      } else {
        expect(messages.length).toBe(0);
      }
    });
  });
};

/**
 * rewire library wrapper
 */
const rewire = (dirname, filename = "app.js") => {
  return rewireLib(path.join(dirname, taskDirectory(), filename));
};

const importTaskFile = (dirname, filename = "app.js") => {
  const path = require("path");
  const fs = require("fs");
  eval.apply(global, [fs.readFileSync(path.join(dirname, taskDirectory(), filename)).toString()]);
};

const getVariable = (app, variableName) => {
  let v;
  try {
    v = app.__get__(variableName);
  } catch (e) {}
  return v;
};

const RunTestCase = (description, criteriaId, points, testBody) => {
  if (typeof points !== 'number') {
    throw new Error(`${description}\nCriteria ID:${criteriaId}\nPoints: ${points} is not a number`);
  }

  if(!UUIDv4.validate(criteriaId)) {
    throw new Error(`${description}\nCriteria ID:${criteriaId} is not UUID`);
  }

  it(`${description}${_joinCharset}${criteriaId}${_pointSplitCharset}${points}`, testBody);
}

export { ESLintTest, importTaskFile, getTaskFileInString, parse, getVariable, rewire, forLoopTest, RunTestCase };
