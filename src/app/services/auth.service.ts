import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private http: HttpClient,private router: Router) {

  }

  isAuthenticated(): boolean {
    return this.getToken() !== undefined;
  }

  storeToken(token: string, user: any) {
    this.storage.set("auth_token", token);
    this.storage.set("user", user);
  }

  getLoginUserDetails(): any {
    if (this.storage.get("user") !== null) {
      return this.storage.get("user");
    } else {
      return null;
    }
  }

  getToken() {
    return this.storage.get("auth_token");
  }

  removeToken() {
    this.storage.remove("user");
    return this.storage.remove("auth_token");
  }

  
}
