import { Console, MissionUtils } from "@woowacourse/mission-utils";

export async function getCarsAsync() {
  try {
    const carsString = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
    );

    return carsString;
  } catch (error) {
    throw new Error("[ERROR] 자동차 이름을 입력받던 중 오류가 발생했습니다.");
  }
}

export async function getCountAsync() {
  try {
    const countString = await Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?\n"
    );

    return countString;
  } catch (error) {
    throw new Error("[ERROR] 시도 횟수를 입력받던 중 오류가 발생했습니다.");
  }
}

export function parseCars(carsString) {
  if (carsString.length === 0 || carsString.trim() === "") {
    throw new Error("[ERROR] 자동차 이름이 입력되지 않았습니다.");
  }

  const cars = carsString.split(",");

  if (cars.some((car) => car.length === 0 || car.trim() === "")) {
    throw new Error("[ERROR] 자동차 이름은 1자 이상이어야 합니다.");
  }
  if (cars.some((car) => car.length > 5)) {
    throw new Error("[ERROR] 자동차 이름은 5자를 초과할 수 없습니다.");
  }
  if (cars.length !== new Set(cars).size) {
    throw new Error("[ERROR] 중복된 자동차 이름이 있습니다.");
  }

  return cars;
}

export function parseCount(countString) {
  if (countString.length === 0 || countString.trim() === "") {
    throw new Error("[ERROR] 시도 횟수가 입력되지 않았습니다.");
  }

  const count = Number(countString);

  if (isNaN(count)) {
    throw new Error("[ERROR] 시도 횟수는 숫자만 입력할 수 있습니다.");
  }
  if (count % 1 !== 0) {
    throw new Error("[ERROR] 시도 횟수는 소수점 없는 숫자여야 합니다.");
  }
  if (count < 1) {
    throw new Error("[ERROR] 시도 횟수는 1회 이상이어야 합니다.");
  }

  return count;
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

export function printWinners(winners) {
  Console.print(`최종 우승자 : ${winners.join(", ")}`);
}

export function findWinners(status) {
  let maxStep = 0;
  let winners = [];

  Object.entries(status).forEach(([car, step]) => {
    if (step === maxStep) {
      winners.push(car);
    }
    if (step > maxStep) {
      maxStep = step;
      winners = [car];
    }
  });

  return winners;
}
