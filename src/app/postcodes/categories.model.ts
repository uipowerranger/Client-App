import { formatDate } from "@angular/common";
export class CategoriesTable {
  id: number;
  _id: string;
  post_code: string;
  createdAt: number;
  status: string;
  state: string;
  constructor(advanceTable) {
    {
      this._id = advanceTable._id || "";
      this.post_code = advanceTable.post_code || "";
      this.state = advanceTable.state || "";
      this.createdAt =
        advanceTable.createdAt || formatDate(new Date(), "yyyy-MM-dd", "en");
      this.status = advanceTable.status || 1;
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
