import { formatDate } from "@angular/common";
export class ProductsTable {
  _id: string;
  id: number;
  item_id: string;
  price: string;
  quantity: string;
  amount: string;
  user: string;
  item: string;
  createdAt: string;

  constructor(data) {
    {
      this.createdAt =
        data.createdAt || formatDate(new Date(), "yyyy-MM-dd", "en");
      this._id = data._id || "";
      this.id = data.id || 0;
      this.item_id = data.item_id || "";
      this.price = data.price || "";
      this.quantity = data.quantity || "";
      this.amount = data.amount || "";
      this.user = data.user || "";
      this.item = data.item || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
