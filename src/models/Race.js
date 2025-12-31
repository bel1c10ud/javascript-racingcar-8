import ForwardRule from "../utils/ForwardRule";

export default class Race {
  #cars;

  constructor(cars) {
    this.#cars = cars;
  }

  run(count) {
    const snapshots = [];

    for (let i = 0; i < count; i++) {
      this.#cars.forEach((car) => car.forward(ForwardRule.canMove()));
      snapshots.push(this.#cars.map((car) => ({ name: car.getName(), mileage: car.getMileage() })));
    }

    return snapshots;
  }

  getWinners() {
    let maxMileage = 0;
    let winners = [];

    this.#cars.forEach((car) => {
      const mileage = car.getMileage();

      if (mileage === maxMileage) {
        winners.push(car);
      }
      if (mileage > maxMileage) {
        maxMileage = mileage;
        winners = [car];
      }
    });

    return winners;
  }
}
