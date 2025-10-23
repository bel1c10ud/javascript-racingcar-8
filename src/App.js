import {
  getInputAsync,
  parseInputs,
  initRace,
  race,
  printEmptyLine,
  printResultHeader,
  printStatus,
} from "./utils.js";

class App {
  async run() {
    const [carsString, countString] = await getInputAsync();
    const [cars, count] = parseInputs(carsString, countString);

    printEmptyLine();
    printResultHeader();

    let status = initRace(cars);

    for (let i = 0; i < count; i++) {
      const newStatus = race(status);
      status = newStatus;

      printStatus(status);
      printEmptyLine();
    }
  }
}

export default App;
