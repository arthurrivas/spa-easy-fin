import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'config/storage-keys';
import { UserModel } from '../models/user-model';

@Injectable()
export class UserStorageService {
  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.token);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  removeToken(): void {
    localStorage.removeItem(STORAGE_KEYS.token);
  }

  getCurrentUser(): UserModel | null {
    let usr = localStorage.getItem(STORAGE_KEYS.currentUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setCurrentUser(obj: UserModel) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.currentUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(obj));
    }
  }

}
