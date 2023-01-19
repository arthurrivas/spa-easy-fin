import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/service/user.service';
import { UserStorageService } from 'app/store/user-store.config';
import { Router } from '@angular/router'

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  opened = false;

  constructor(
    private router: Router,
    private userStore: UserStorageService
  ) {}

  ngOnInit(): void {}


  public logout(){
    this.userStore.removeToken()
    this.router.navigate(['/login']);
  }
}
