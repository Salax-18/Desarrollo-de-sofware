
import Dexie, { type Table } from "dexie";

export interface Fruit {
  id?: number;
  name: string;
  color: string;
}

class FruitDatabase extends Dexie {
  fruits!: Table<Fruit, number>;

  constructor() {
    super("Challenge06DB");

    this.version(1).stores({
      fruits: "++id, name, color",
    });
  }
}

export const db = new FruitDatabase();
