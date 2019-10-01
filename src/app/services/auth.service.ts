    
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class User {
  name:String;
  email:String;
  
  constructor(name: String, email: String) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {

  currentUser: User;

  public login(credential) {
    if (credential.email == null || credential.password == null) {
      return Observable.throw("please insert credentials");
    } else {
      return Observable.create(observer => {
        let access = (credential.password === 'pass' && credential.email === 'email');
        this.currentUser = new User('Thoni', 'tunathoni@gmail.com');
        observer.next(access);
        observer.complete();
      });
    }
  }

  /**
   * register
   */
  public register(credential) {
    if (credential.email == null || credential.password == null) {
      return Observable.throw("please insert credentials");
    } else {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  /**
   * getUserInfo
   */
  public getUserInfo() : User {
    return this.currentUser;
  }

  /**
   * logout
   */
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}