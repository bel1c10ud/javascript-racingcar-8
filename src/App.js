import { getInputAsync, parseInputs } from "./utils.js";

class App {
  async run() {
    const [carsString, countString] = await getInputAsync();
    const [cars, count] = parseInputs(carsString, countString);
  }
}

export default App;
