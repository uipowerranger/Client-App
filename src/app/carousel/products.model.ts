import { formatDate } from "@angular/common";
export class ProductsTable {
  id: number;
  _id: string;
  description: string;
  createdAt: number;
  status: boolean;
  image: string;
  state: string;
  category: string;
  constructor(advanceTable) {
    {
      this.createdAt =
        advanceTable.createdAt || formatDate(new Date(), "yyyy-MM-dd", "en");
      this._id = advanceTable._id || "";
      this.status = advanceTable.status || 1;
      this.image = advanceTable.image || "";
      this.description = advanceTable.description || "";
      this.state = advanceTable.state || "";
      this.category = advanceTable.category || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
