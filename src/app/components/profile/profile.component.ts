import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: UserModel;

  constructor() {
    this.user = new UserModel()
    this.user.email = "arthurrivas1@gmail.com"
    this.user.name = "arthur rivas"
    this.user.birthday = "19/07/2000"
    this.user.phone = "991842652"

  }

  ngOnInit(): void {
  }

}
