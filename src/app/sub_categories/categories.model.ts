import { formatDate } from "@angular/common";
export class CategoriesTable {
  id: number;
  _id: string;
  sub_category_name: string;
  createdAt: number;
  status: string;
  category: string;
  constructor(advanceTable) {
    {
      this._id = advanceTable._id || "";
      this.sub_category_name = advanceTable.sub_category_name || "";
      this.category = advanceTable.category || "";
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
