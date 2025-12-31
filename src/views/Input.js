import { Console } from "@woowacourse/mission-utils";

export default class Input {
  async getInputAsync(message) {
    try {
      const input = await Console.readLineAsync(`${message}\n`);
      return input;
    } catch (error) {
      throw new Error("[ERROR] 사용자 입력을 처리하던 중 오류가 발생했습니다.");
    }
  }
}
