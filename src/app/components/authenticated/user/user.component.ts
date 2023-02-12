import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../models/user-model";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'email', 'phone'];
  public users: UserModel[] = []

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe((data) =>{
      this.users = data;
    })
  }

}
