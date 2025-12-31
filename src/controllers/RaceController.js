import Car from "../models/Car.js";
import Input from "../views/Input.js";
import Output from "../views/Output.js";
import Parser from "../utils/Parser.js";
import Race from "../models/Race.js";

export default class RaceController {
  #input;
  #output;

  constructor() {
    this.#input = new Input();
    this.#output = new Output();
  }

  async start() {
    const [names, count] = await this.#getUserInputAsync();
    this.#output.printEmptyLine();

    const cars = names.map((name) => new Car(name));
    const race = new Race(cars);
    const snapshots = race.run(count);

    this.#output.printRaceIntro();
    snapshots.forEach((snapshot) => {
      snapshot.forEach((car) => this.#output.printRaceProgress(car));
      this.#output.printEmptyLine();
    });

    const winners = race.getWinners();
    this.#output.printWinners(winners);
  }

  async #getUserInputAsync() {
    const namesStr = await this.#input.getInputAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)");
    const names = Parser.parseNames(namesStr);

    const countStr = await this.#input.getInputAsync("시도할 횟수는 몇 회인가요?");
    const count = Parser.parseCount(countStr);

    return [names, count];
  }
}
