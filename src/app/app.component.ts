import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'easy_fin_frontend';



  public getTitle (){
    return 'easy_fin_frontend';
  }


}
