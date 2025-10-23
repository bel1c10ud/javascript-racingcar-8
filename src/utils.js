import { Console, MissionUtils } from "@woowacourse/mission-utils";

export async function getInputAsync() {
  try {
    const carsString = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
    );

    const countString = await Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?\n"
    );

    return [carsString, countString];
  } catch (error) {

  }
}

export function parseInputs(carsString, countString) {
  const cars = carsString.split(",").map((el) => el.trim());
  const count = Number(countString);

  return [cars, count];
}

export function initRace(cars) {
  const status = {};

  cars.forEach((car) => {
    status[car] = 0;
  });

  return status;
}

export function race(prevStatus) {
  const newStatus = Object.assign({}, prevStatus);

  Object.keys(prevStatus).forEach((car) => {
    const rand = MissionUtils.Random.pickNumberInRange(0, 9);

    if (rand >= 4) newStatus[car]++;
  });

  return newStatus;
}

export function printResultHeader() {
  Console.print(`실행 결과`);
}

export function printEmptyLine() {
  Console.print(``);
}

export function printStatus(status) {
  Object.entries(status).forEach(([car, step]) =>
    Console.print(`${car} : ${"-".repeat(step)}`)
  );
}
