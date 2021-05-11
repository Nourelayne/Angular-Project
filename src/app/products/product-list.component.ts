import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from './product.service';

@Component({
   templateUrl: "./product-list.component.html",
   styleUrls : ["./product-list.component.css"]
})

export class ProductListComponent implements OnInit, OnDestroy{
   pageTitle: string = 'Product List';
   showImage : boolean  = false;
   private _listFilter: string = "";
   filtredProducts : IProduct[] = [];
   products: IProduct[] = [];
   private  _productService;
  sub ! : Subscription;
  errorMessage: string = '';
   constructor(productService : ProductService){
       this._productService = productService;
   }

   public get listFilter() : string {
       return this._listFilter;
   }

   
   public set listFilter(value : string) {
      this._listFilter = value;
      console.log(" In setter : " + value);
      this.filtredProducts = this.performFilter(value);
   }
 
   performFilter(filterBy : string) : IProduct[]{
       filterBy = filterBy.toLocaleLowerCase();
       return this.products.filter((product : IProduct)=> product.productName.toLocaleLowerCase().includes(filterBy));
   }

   onRatingClicked(message: string) : void {
       this.pageTitle = "Product List : " + message;
   }

   toggleImage(): void {
       this.showImage = ! this.showImage;
   }

   ngOnInit(): void {
       this.sub = this._productService.getProducts().subscribe({
           next : products => {
               this.products = products;
               this.filtredProducts = this.products;
           },
           error: err  =>  this.errorMessage = err
       });
  }

  ngOnDestroy(){
      this.sub.unsubscribe();
  }
}