import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser,faSignOutAlt,faList,faPlus,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType:string='default'
 userName:string="";
 sellerName:string="";
 user=faUser
 signout=faSignOutAlt
 list=faList
 add=faPlus
 cart=faShoppingCart
 cartitem=0

  constructor(private router:Router,private product:ProductService) { }
  searchresult:product[]|undefined
  ngOnInit(): void {

    this.router.events.subscribe((val:any)=>{
      
      if(val.url){
        
        if(localStorage.getItem('seller')&& val.url.includes('seller')){
          let sellerstore=localStorage.getItem('seller');
        
          let sellerData=sellerstore&&JSON.parse(sellerstore)[0];

          this.sellerName=sellerData.name;
          this.menuType='seller'
        }
        else if(localStorage.getItem('user')){
          let userstore=localStorage.getItem('user');
          let userData=userstore&&JSON.parse(userstore)[0];
          if(userData){
          this.userName=userData.name;}
          this.menuType='user';
          this.product.getcartlist(userData.id)
          
        }
        else{
          this.menuType='default'
        }
      }
    })
    let cartdata=localStorage.getItem('localcart')
   
    if(cartdata){
      this.cartitem=JSON.parse(cartdata).length

    }
    this.product.cartdata.subscribe((result)=>{
      this.cartitem=result.length
    })
    
  }

  sellerlogout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/'])
    this.menuType='default'
  }
  userlogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth'])
    this.menuType='default'
    this.product.cartdata.emit([])
  }
searchproduct(event:KeyboardEvent){
if(event){
  const element=event.target as HTMLInputElement;
  const query=element.value;

  this.product.searchproduct(query).subscribe((result)=>{
    
    if(result){
      if(query.length){
      this.searchresult=result}
      else{
        this.searchresult=undefined
      }
    }
  })
 
}
}
hide(){
  this.searchresult=undefined
}
submitsearch(val:string){
  
  this.router.navigate([`search/${val}`])
}
redirectodetails(id:string){
  this.router.navigate(['/details/'+id])
}
}
