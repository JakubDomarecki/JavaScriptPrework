import {assignmentExpression, binaryExpression} from "../expressions";
import { parseBody } from "../index";
import * as _ from "lodash";

export const ifStatement = ({ test, consequent, alternate }) => {
  return {
    condition: binaryExpression(test).value,
    consequent: _.isArray(consequent.body) ? parseBody(consequent.body) : parseBody([consequent.expression]),
    alternate: alternate !== null ? parseBody(alternate.body) : null,
  };
};
