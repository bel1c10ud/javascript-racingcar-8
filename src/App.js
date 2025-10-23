import {
  getCarsAsync,
  parseCars,
  getCountAsync,
  parseCount,
  initRace,
  race,
  printEmptyLine,
  printResultHeader,
  printStatus,
  printWinners,
  findWinners,
} from "./utils.js";

class App {
  async run() {
    const carsString = await getCarsAsync();
    const cars = parseCars(carsString);

    const countString = await getCountAsync();
    const count = parseCount(countString);

    printEmptyLine();
    printResultHeader();

    let status = initRace(cars);

    for (let i = 0; i < count; i++) {
      const newStatus = race(status);
      status = newStatus;

      printStatus(status);
      printEmptyLine();
    }

    const winners = findWinners(status);

    printWinners(winners);
  }
}

export default App;
