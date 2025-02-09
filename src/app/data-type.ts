export interface signUp{
    name:String,
    email:string,
    password:string,
    
}
export interface login{
    email:string,
    password:string,
}
export interface product{
    name:string
    price:number
    category:string
    color:string
    description:string
    image:string
    id:string
    quantity:number|undefined
    productid:string|undefined
}
export interface cart{
    name:string
    price:number
    category:string
    color:string
    description:string
    image:string
    id:string|undefined
    quantity:number|undefined
    userid:string
    productid:string
}
export interface cartpricesummary{
    price:number
    discount:number
    tax:number
    delivery:number
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:number,
    totalprice:number,
    userid:string,
    id:string|undefined
}