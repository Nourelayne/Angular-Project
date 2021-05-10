import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from './product.service';

@Component({
   selector: "pm-products",
   templateUrl: "./product-list.component.html",
   styleUrls : ["./product-list.component.css"]
})

export class ProductListComponent implements OnInit{
   pageTitle: string = 'Product List';
   showImage : boolean  = false;
   private _listFilter: string = "";
   filtredProducts : IProduct[] = [];
   products: IProduct[] = [];
   private  _productService;

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
       this.products = this._productService.getProducts();
       this.filtredProducts = this.products;
  }
}