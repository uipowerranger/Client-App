import { formatDate } from "@angular/common";
export class GiftBoxTable {
  id: number;

  filter_name: string;
  constructor(advanceTable) {
    {
      this.filter_name = advanceTable.filter_name;
    }
  }

}
