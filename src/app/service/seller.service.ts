import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerloggedIn=new BehaviorSubject<boolean>(false);
   isloginerror= new EventEmitter<boolean>();

  constructor(private http: HttpClient,private router:Router) { }
  userSignUp(data: signUp) {
    return this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result:any) => {
      
      if(result){
        this.isSellerloggedIn.next(true)
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home'])
      }
    })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerloggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }
  userlogin(data:login){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{
      observe:'response'
    }).subscribe((result:any)=>{
      
      if(result && result.body && result.body.length===1){
        const user = result.body[0];
            
        if (String(user.password) === String(data.password)) {
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.isloginerror.emit(false)
        this.router.navigate(['seller-home'])}
        else{
          this.isloginerror.emit(true)
        }
      }
      else{
        this.isloginerror.emit(true)
      }
    })
  }
}
