import { getInputAsync } from "./utils.js";

class App {
  async run() {
    const [carsString, countString] = await getInputAsync();
  }
}

export default App;
