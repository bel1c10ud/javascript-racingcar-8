import Validator from "./Validator.js";

export default class Parser {
  static parseNames(namesStr) {
    const names = namesStr.split(",");

    names.forEach((name) => {
      Validator.validateLength(name);
    });

    return names;
  }

  static parseCount(countStr) {
    const count = Number(countStr);

    Validator.validateNumber(count);

    return count;
  }
}
