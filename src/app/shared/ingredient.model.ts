export class Ingredient {
  private name: string;
  private amount: number;

  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }

  getName(): string {
    return this.name;
  }
  getAmount(): number {
    return this.amount;
  }

  setName(name: string) {
    this.name = name;
  }

  setAmount(amount: number) {
    this.amount = amount;
  }
}
