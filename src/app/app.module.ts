import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';

// COMPONENT IMPORT
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

// ANGULAR MATERIALS
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatGridListModule } from '@angular/material/grid-list';

// STORE 
import { StoreModule } from '@ngrx/store'
import { mainReducer } from './store/main.state';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
]
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({app: mainReducer}),
  ],
  declarations: [AppComponent, ProfileComponent, DashboardComponent, LoginComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
