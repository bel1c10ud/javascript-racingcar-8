export default class Validator {
  static validateLength(name) {
    if (name.length === 0) {
      throw new Error("[ERROR] 자동차 이름은 비어있을 수 없습니다.");
    }

    if (name.length > 5) {
      throw new Error("[ERROR] 자동차 이름은 5자 이하여야 합니다.");
    }
  }

  static validateNumber(count) {
    if (isNaN(count)) {
      throw new Error("[ERROR] 시도 횟수는 숫자여야 합니다.");
    }

    if (count <= 0 || count % 1 !== 0) {
      throw new Error("[ERROR] 시도 횟수는 양의 정수여야 합니다.");
    }
  }
}
