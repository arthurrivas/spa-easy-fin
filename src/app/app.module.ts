import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

// COMPONENT IMPORT
import { BaseComponent as BaseAuthencicated } from './components/authenticated/base/base.component';
import { ProfileComponent } from './components/authenticated/profile/profile.component';
import { DashboardComponent } from './components/authenticated/dashboard/dashboard.component';

import { BaseComponent as BaseOpen } from './components/open/base/base.component';
import { LoginComponent } from './components/open/login/login.component';

// ANGULAR MATERIALS
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

// STORE
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './security/auth.guard';
import { UserStorageService } from './store/user-store.config';
import { AuthInterceptor } from './security/auth_interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: BaseAuthencicated,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: BaseOpen,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
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
    NgbModule,
  ],
  declarations: [
    AppComponent,
    ProfileComponent,
    DashboardComponent,
    LoginComponent,
    BaseAuthencicated,
    BaseOpen,
  ],
  providers: [
    UserStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
