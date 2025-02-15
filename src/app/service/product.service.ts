import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cart, order, product } from '../data-type';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartdata = new EventEmitter<product[] | []>()
  constructor(private http: HttpClient) { }
  addProduct(data: product) {
    return this.http.post('https://back-end-for-angular.onrender.com/products', data)
  }
  productlist() {
    return this.http.get<product[]>('https://back-end-for-angular.onrender.com/products')
  }
  deleteproduct(id: string) {
    return this.http.delete(`https://back-end-for-angular.onrender.com/products/${id}`)
  }
  getproduct(id: string) {
    return this.http.get<product>(`https://back-end-for-angular.onrender.com/products/${id}`)
  }
  updateproduct(data: product) {
    return this.http.put(`https://back-end-for-angular.onrender.com/products/${data.id}`, data)
  }
  popularproducts() {
    return this.http.get<product[]>('https://back-end-for-angular.onrender.com/products?_limit=3')
  }
  trendyproduct() {
    return this.http.get<product[]>('https://back-end-for-angular.onrender.com/products')
  }
  searchproduct(query: string) {

    return this.http.get<product[]>(`https://back-end-for-angular.onrender.com/products?category=${query}`)
  }
  localAddcart(data: product) {
    let cartdata = []
    let localcart = localStorage.getItem('localcart');
    if (!localcart) {
      localStorage.setItem('localcart', JSON.stringify([data]))
      this.cartdata.emit([data]);
    }
    else {
      cartdata = JSON.parse(localcart)
      cartdata.push(data)
      localStorage.setItem('localcart', JSON.stringify(cartdata))
      this.cartdata.emit(cartdata);
    }
  }
  removeitemfromcart(id: string) {
    let cartdata = localStorage.getItem('localcart')
    if (cartdata) {
      let item = JSON.parse(cartdata)
      item = item.filter((item: product) => id !== item.id)
      localStorage.setItem('localcart', JSON.stringify(item))
      this.cartdata.emit(item);
    }
  }
  addtocart(data: cart) {
    return this.http.post('https://back-end-for-angular.onrender.com/cart', data)
  }
  getcartlist(userid: string) {
    return this.http.get<product[]>(`https://back-end-for-angular.onrender.com/cart?userid=${userid}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body) {
        this.cartdata.emit(result.body)
      }
    })
  }
  removetocart(id: string) {
    return this.http.delete(`https://back-end-for-angular.onrender.com/cart/` + id)
  }
  currentcart() {
    let userstore = localStorage.getItem('user');
    let userData = userstore && JSON.parse(userstore)[0];
    let userid
    if (userData) {
      userid = userData.id;
    }

    return this.http.get<cart[]>('https://back-end-for-angular.onrender.com/cart?userid=' + userid)
  }
  ordernow(data:order){
    return this.http.post('https://back-end-for-angular.onrender.com/orders',data)
  }
  orderlist(){
    let userstore = localStorage.getItem('user');
    let userData = userstore && JSON.parse(userstore)[0];
    let userid
    if (userData) {
      userid = userData.id;
    }

    return this.http.get<order[]>('https://back-end-for-angular.onrender.com/orders?userid=' + userid)

  }
  deletecartitems(cartid:string){
    return this.http.delete(`https://back-end-for-angular.onrender.com/cart/` + cartid).subscribe((result)=>{
      this.cartdata.emit([])

    })
  }
  cancelorder(id:string){
    return this.http.delete(`https://back-end-for-angular.onrender.com/orders/` + id)
  }
}
