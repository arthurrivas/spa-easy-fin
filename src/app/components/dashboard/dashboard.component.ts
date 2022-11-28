import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { decrementCounter, IMainState, incrementCounter } from 'src/app/store/main.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  counter$ = this.mainStore
    .select('app')
    .pipe(
      map(e => e.counter)
    )

  constructor(
    private mainStore: Store<{app: IMainState}> 
  ) {}

  ngOnInit(): void {}

  public increment(){
    this.mainStore.dispatch(incrementCounter());
  }

  public decrement(){
    this.mainStore.dispatch(decrementCounter())
  }
}
