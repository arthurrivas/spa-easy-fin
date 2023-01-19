import { Component, OnInit } from '@angular/core';
import { UserModel } from 'app/models/user-model';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  public user?: UserModel | null = null;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((data) => { 
      console.log(data)
      this.user = data
      
    })
  }
}
