import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { order } from '../data-type';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderdata:order[]|undefined
  constructor(private product:ProductService) { }
 ord=faShoppingBasket
  ngOnInit(): void {
   this.getorderlist()
  }
cancelorder(id:string|undefined){
 id&&this.product.cancelorder(id).subscribe((result)=>
{if(result){
this.getorderlist()
}

})
}
getorderlist(){
  this.product.orderlist().subscribe((result)=>{
    this.orderdata=result
    
  })
}
}
