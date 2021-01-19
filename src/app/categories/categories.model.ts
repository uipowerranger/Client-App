import { formatDate } from '@angular/common';
export class CategoriesTable {
  id: number;
  _id: string;
  category_name: string;
  created_at: number;
  is_active: string;
  constructor(advanceTable) {
    {
      this._id = advanceTable._id || '';
      this.category_name = advanceTable.category_name || '';
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
