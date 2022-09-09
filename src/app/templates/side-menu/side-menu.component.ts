import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  showFiller: boolean;

  constructor() {
    this.showFiller = false;
   }

  ngOnInit(): void {
  }

}
