import { Component, OnInit } from '@angular/core';
import { signUp,login, product, cart } from '../data-type';
import { UserService } from '../service/user.service';
import { ProductService } from '../service/product.service';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin=false
  autherror:string=''
  constructor(private user:UserService,private product:ProductService) { }

  ngOnInit(): void {
  this.user.userauthreload()
  }
  signup(data:signUp):void{
    this.user.userSignup(data)
    this.localcarttoremote()

}
openLogin(){
  this.showLogin=true
}
opensignup(){
  this.showLogin=false
}
login(data:login):void{
  this.user.userlogin(data)
  this.user.isloginerror.subscribe((result)=>{
    if(result){
      this.autherror='**invaild email or passsword**'
    }
    else{
      this.autherror=''
      this.localcarttoremote()
    }
  })
 
}
localcarttoremote(){
 let data=localStorage.getItem('localcart')  
 let user=localStorage.getItem('user')
 let userid=user&&JSON.parse(user)[0].id
 
 if(data){
  let cartdatalist:product[]=JSON.parse(data)
 
  cartdatalist.forEach((product:product,index)=>{
   let cartdata:cart={
    ...product,
    userid,
    productid:product.id
   }
   delete cartdata.id
   setTimeout(() => {
    this.product.addtocart(cartdata).subscribe((result)=>{
      if(result){
        console.log('datastored')
      }
     })
   }, 500);
   if(cartdatalist.length===index+1){
    localStorage.removeItem('localcart')
   }
  })
 }
setTimeout(() => {
  this.product.getcartlist(userid) 
}, 2000);
}
}
