import { formatDate } from "@angular/common";
export class CategoriesTable {
  id: number;
  _id: string;
  category_name: string;
  createdAt: number;
  status: string;
  constructor(advanceTable) {
    {
      this._id = advanceTable._id || "";
      this.category_name = advanceTable.category_name || "";
      this.createdAt =
        advanceTable.createdAt || formatDate(new Date(), "yyyy-MM-dd", "en");
      this.status = advanceTable.status || true;
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
