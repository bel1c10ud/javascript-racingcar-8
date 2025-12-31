import RaceController from "./controllers/RaceController.js";

class App {
  async run() {
    const controller = new RaceController();
    await controller.start();
  }
}

export default App;
