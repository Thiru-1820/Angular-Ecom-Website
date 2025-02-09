import { Component, OnInit } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showLogin=false
  autherror:string=''
  constructor(private seller:SellerService) { }

  ngOnInit(): void {
  this.seller.reloadSeller()
  }
  signup(data:signUp):void{
    
      this.seller.userSignUp(data);
     
}
openLogin(){
  this.showLogin=true
}
opensignup(){
  this.showLogin=false
}
login(data:login):void{
  this.seller.userlogin(data)
  this.seller.isloginerror.subscribe((iserror)=>{
    if(iserror){
      this.autherror='Invalid email or password'
    }
    else{
      this.autherror=''
    }
  })
    
}
}