import { Console } from "@woowacourse/mission-utils";

export default class Output {
  printEmptyLine() {
    Console.print("");
  }

  printRaceIntro() {
    Console.print("실행 결과");
  }

  printRaceProgress(car) {
    Console.print(`${car.name} : ${"-".repeat(car.mileage)}`);
  }

  printWinners(winners) {
    Console.print(`최종 우승자 : ${winners.map((winner) => winner.getName()).join(", ")}`);
  }
}
