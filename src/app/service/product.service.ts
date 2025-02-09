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
    return this.http.post('http://localhost:3000/products', data)
  }
  productlist() {
    return this.http.get<product[]>('http://localhost:3000/products')
  }
  deleteproduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getproduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  updateproduct(data: product) {
    return this.http.put(`http://localhost:3000/products/${data.id}`, data)
  }
  popularproducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3')
  }
  trendyproduct() {
    return this.http.get<product[]>('http://localhost:3000/products')
  }
  searchproduct(query: string) {

    return this.http.get<product[]>(`http://localhost:3000/products?category=${query}`)
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
    return this.http.post('http://localhost:3000/cart', data)
  }
  getcartlist(userid: string) {
    return this.http.get<product[]>(`http://localhost:3000/cart?userid=${userid}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body) {
        this.cartdata.emit(result.body)
      }
    })
  }
  removetocart(id: string) {
    return this.http.delete(`http://localhost:3000/cart/` + id)
  }
  currentcart() {
    let userstore = localStorage.getItem('user');
    let userData = userstore && JSON.parse(userstore)[0];
    let userid
    if (userData) {
      userid = userData.id;
    }

    return this.http.get<cart[]>('http://localhost:3000/cart?userid=' + userid)
  }
  ordernow(data:order){
    return this.http.post('http://localhost:3000/orders',data)
  }
  orderlist(){
    let userstore = localStorage.getItem('user');
    let userData = userstore && JSON.parse(userstore)[0];
    let userid
    if (userData) {
      userid = userData.id;
    }

    return this.http.get<order[]>('http://localhost:3000/orders?userid=' + userid)

  }
  deletecartitems(cartid:string){
    return this.http.delete(`http://localhost:3000/cart/` + cartid).subscribe((result)=>{
      this.cartdata.emit([])

    })
  }
  cancelorder(id:string){
    return this.http.delete(`http://localhost:3000/orders/` + id)
  }
}
