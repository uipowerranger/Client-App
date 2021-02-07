import { formatDate } from "@angular/common";
export class ProductsTable {
  id: number;
  _id: string;
  category_details: string;
  createdAt: number;
  deal_details: string;
  has_deal: string;
  has_offer: string;
  home_page_display: string;
  status: boolean;
  image: string;
  item_name: string;
  items_available: string;
  offer_details: string;
  offer_from_date: number;
  offer_to_date: number;
  post_code_details: string;
  price: string;
  state_details: string;
  sub_category_details: string;
  weight: string;
  constructor(advanceTable) {
    {
      this.createdAt =
        advanceTable.createdAt || formatDate(new Date(), "yyyy-MM-dd", "en");
      this._id = advanceTable._id || "";
      this.category_details = advanceTable.category_details || "";
      this.deal_details = advanceTable.deal_details || "";
      this.has_deal = advanceTable.has_deal || "0";
      this.has_offer = advanceTable.has_offer || "0";
      this.home_page_display = advanceTable.home_page_display || true;
      this.status = advanceTable.status || 1;
      this.image = advanceTable.image || "";
      this.item_name = advanceTable.item_name || "";
      this.items_available = advanceTable.items_available || "";
      this.offer_details = advanceTable.offer_details || "";
      this.offer_from_date =
        advanceTable.offer_from_date ||
        formatDate(new Date(), "yyyy-MM-dd", "en");
      this.offer_to_date =
        advanceTable.offer_to_date ||
        formatDate(new Date(), "yyyy-MM-dd", "en");
      this.post_code_details = advanceTable.post_code_details || "";
      this.price = advanceTable.price || "";
      this.state_details = advanceTable.state_details || "";
      this.sub_category_details = advanceTable.sub_category_details || "";
      this.weight = advanceTable.weight || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
