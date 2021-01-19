import { formatDate } from '@angular/common';
export class CategoriesTable {
  id: number;
  _id: string;
  sub_category_name: string;
  created_at: number;
  is_active: string;
  category_details: string;
  constructor(advanceTable) {
    {
      this._id = advanceTable._id || '';
      this.sub_category_name = advanceTable.sub_category_name || '';
      this.category_details = advanceTable.category_details || '';
      this.created_at = advanceTable.created_at || formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.is_active = advanceTable.is_active || '1';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
