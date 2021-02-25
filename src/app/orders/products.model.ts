import { formatDate } from "@angular/common";
export class ProductsTable {
  _id: string;
  id: number;
  user: string;
  items: any;
  order_date: string;
  status: number;
  total_amount: number;
  email_id: string;
  phone_number: string;
  alternate_phone: string;
  mailing_address: any;
  shipping_address: any;
  payment: boolean;
  order_completed: boolean;
  createdAt: string;

  constructor(data) {}
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
