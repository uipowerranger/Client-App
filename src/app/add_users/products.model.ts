import { formatDate } from "@angular/common";
export class ProductsTable {
  _id: string;
  id: number;
  first_name: string;
  last_name: string;
  email_id: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  post_code: string;
  designation: string;
  password: string;
  image: string;
  login_otp: number;
  assign_state: string;
  role: string;
  createdAt: string;

  constructor(data) {
    {
      this.createdAt =
        data.createdAt || formatDate(new Date(), "yyyy-MM-dd", "en");
      this._id = data._id || "";
      this.id = data.id || 0;
      this.image = data.image || "";
      this.first_name = data.first_name || "";
      this.last_name = data.last_name || "";
      this.email_id = data.email_id || "";
      this.phone_number = data.phone_number || "";
      this.address = data.address || "";
      this.city = data.city || "";
      this.state = data.state || "";
      this.post_code = data.post_code || "";
      this.designation = data.designation || "";
      this.password = data.password || "";
      this.login_otp = data.login_otp || 0;
      this.assign_state = data.assign_state || "";
      this.role = data.role || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
