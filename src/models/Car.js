export default class Car {
  #name;
  #mileage;

  constructor(name) {
    this.#name = name;
    this.#mileage = 0;
  }

  forward(canMove = true) {
    if (canMove) {
      this.#mileage = this.#mileage + 1;
    }
  }

  getName() {
    return this.#name;
  }

  getMileage() {
    return this.#mileage;
  }
}
