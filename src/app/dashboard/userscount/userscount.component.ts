import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userscount',
  templateUrl: './userscount.component.html',
  styleUrls: ['./userscount.component.sass']
})
export class UserscountComponent implements OnInit {

  usercount:number;
  constructor(private usersvc: UsersService) { }

  ngOnInit(): void {
    this.usersvc.getUsers().subscribe((res: any) => {
      this.usercount = res.data.length
      console.log("Users count:", res.data.length)
    })
  }

}
