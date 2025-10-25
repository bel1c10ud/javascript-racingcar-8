import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import {
  getCarsAsync,
  getCountAsync,
  initRace,
  parseCars,
  parseCount,
  race,
} from "../src/utils.js";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("사용자 입력 기능", () => {
  test("자동차 이름 입력 받기", async () => {
    mockQuestions(["pobi,woni"]);
    await expect(getCarsAsync()).resolves.toBe("pobi,woni");
  });

  test("시도 횟수 입력 받기", async () => {
    mockQuestions(["1"]);
    await expect(getCountAsync()).resolves.toBe("1");
  });
});

describe("입력 받은 값 파싱", () => {
  test("입력 받은 자동차 이름 쉼표 기준으로 나누기", () => {
    expect(parseCars("pobi,woni")).toEqual(["pobi", "woni"]);
  });

  test("입력 받은 시도 횟수 숫자 형식으로 변환하기", () => {
    expect(parseCount("1")).toBe(1);
  });
});

describe("자동차 경주", () => {
  const MOVING_FORWARD = 4;
  const STOP = 3;

  test("초기화", () => {
    expect(initRace(["pobi", "woni"])).toEqual({ pobi: 0, woni: 0 });
  });

  test("자동차 전진", () => {
    mockRandoms([MOVING_FORWARD, MOVING_FORWARD]);
    expect(race({ pobi: 0, woni: 0 })).toEqual({ pobi: 1, woni: 1 });
  });

  test.each([
    [
      "우승자 출력",
      ["pobi,woni", "1"],
      [MOVING_FORWARD, STOP],
      ["pobi : -", "woni : ", "최종 우승자 : pobi"],
    ],
    [
      "공동 우승자 출력",
      ["pobi,woni", "1"],
      [MOVING_FORWARD, MOVING_FORWARD],
      ["pobi : -", "woni : -", "최종 우승자 : pobi, woni"],
    ],
  ])("%s", async (_, inputs, magicNumbers, logs) => {
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms(magicNumbers);

    const app = new App();
    await app.run();

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });
});

describe("예외 처리", () => {
  test.each([
    ["자동차 이름에 빈값이 입력된 경우", ""],
    ["자동차 이름이 빈값인 경우", "pobi,"],
    ["자동차 이름이 5자를 초과하는 경우", "pobi,javaji"],
    ["자동차 이름이 중복되는 경우", "pobi,pobi"],
  ])("%s", async (_, carsString) => {
    mockQuestions([carsString]);
    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test.each([
    ["시도 횟수가 빈값인 경우", ""],
    ["시도 횟수가 숫자가 아닌 경우", "ten"],
    ["시도 횟수가 소수점을 포함한 실수인 경우", "1.12"],
    ["시도 횟수가 1회 미만인 경우", "-1"],
  ])("%s", async (_, countString) => {
    mockQuestions(["pobi,woni", countString]);
    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });
});
