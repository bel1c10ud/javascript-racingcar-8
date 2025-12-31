import { Random } from "@woowacourse/mission-utils";

export default class ForwardRule {
  static canMove() {
    return Random.pickNumberInRange(0, 9) >= 4;
  }
}