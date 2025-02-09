import { Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  isloginerror = new EventEmitter<boolean>();
  constructor(private http: HttpClient, private router: Router) { }
  userSignup(user: signUp) {
    this.http.post('http://localhost:3000/users', user, { observe: 'response' }).subscribe((result: any) => {
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
  }
  userauthreload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }
  userlogin(data: login) {
    return this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {
      observe: 'response'
    }).subscribe((result: any) => {

      if (result && result.body && result.body.length === 1) {
        const user = result.body[0];

        if (String(user.password) === String(data.password)) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.isloginerror.emit(false)
          this.router.navigate(['/'])
        }
        else {
          this.isloginerror.emit(true)
        }
      }
      else {
        this.isloginerror.emit(true)
      }
    })
  }
}

