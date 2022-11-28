import { Injectable } from '@angular/core';

@Injectable()
export class UserRepository {
  async random() {
    const resp = await fetch('https://randomuser.me/api/');
    const data = await resp.json();
    const {
      results: [user],
    } = data;
    return user;
  }
}
