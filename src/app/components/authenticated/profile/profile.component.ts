import { Component, OnInit } from '@angular/core';
import { AddressModel } from 'app/models/address.model';
import { UserModel } from 'app/models/user-model';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  public user?: UserModel;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((data) => { 
      this.user = data
    })
  }

  getAddress(): AddressModel{
    return this.user.address
  }

  getFormatedAddress(): string{
    return (
      this.getAddress().city.name + ' - ' + this.getAddress().city.state.acronym
    );
  }

}
