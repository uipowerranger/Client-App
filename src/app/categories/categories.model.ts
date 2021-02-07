import { formatDate } from "@angular/common";
export class CategoriesTable {
  id: number;
  _id: string;
  category_name: string;
  createdAt: number;
  status: string;
  state_details: string;
  post_code_details: string;
  constructor(advanceTable) {
    {
      this._id = advanceTable._id || "";
      this.category_name = advanceTable.category_name || "";
      this.createdAt =
        advanceTable.createdAt || formatDate(new Date(), "yyyy-MM-dd", "en");
      this.status = advanceTable.status || 1;
      this.state_details = advanceTable.state_details || "";
      this.post_code_details = advanceTable.post_code_details || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
