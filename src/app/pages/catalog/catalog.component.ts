import { Subscription } from 'rxjs';
import { ProductService } from '../../shared/service/product/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  public productSubscription!: Subscription;
  public routerSubscription!: Subscription;
  private product: any;
  public userProducts:any;
  public p: number = 1;
  public collection: any[] = []
  public rangeValue = 0
  public rangeValue2 = 0
  public title: string = '';
  public brand: Array<string> = [];
  public filterBrand: string = '';
  private brendItem: Array<any> = []
  value: number = 0;
  maxvalue: number = 10000;
  options: Options = {
    floor: 0,
    ceil: 10000
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.checkPath();
    this.loadProducts();
  }

  async loadProducts() {
    const category: any = this.activatedRoute.snapshot.paramMap.get('category');
    const data = {
      "category": category
    }
    this.routerSubscription = await this.productService.loadProductByCategory(data).subscribe(data => {
      this.product = data;
      this.userProducts = data;
      this.getBrandProducts();
      return true
    })

  }

  checkPath() {
    this.routerSubscription = this.activatedRoute.params.subscribe(() => {
      this.loadProducts()
    })
  }

  getBrandProducts(): void {
    this.product.forEach((elem: any) => {
      this.title = elem.category.name;
      this.brand.push(elem.brand)
    });
    this.brand = this.brand.filter((item, index) => this.brand.indexOf(item) === index);
  }

  addToCart(item: any) {
    let cart: any = []
    if (localStorage.length > 0 && localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart') as string);
      let index = cart.findIndex((elem: any) => { return elem._id === item._id })
      if (index >= 0) {
        cart[index].count++
        localStorage.setItem('cart', JSON.stringify(cart));
        this.productService.$checkBasket.next(true);
      } else {
        cart.push(item)
        localStorage.setItem('cart', JSON.stringify(cart));
        this.toastr.success('Товар успішно доданий в корзину');
        this.productService.$checkBasket.next(true);
      }
    } else {
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.toastr.success('Товар успішно доданий в корзину');
      this.productService.$checkBasket.next(true)
    }
  }

  filterChange(status: boolean, event: any): void {
    if (status) {
      this.brendItem.push(event.target.value)
    } else {
      const index = this.brendItem.findIndex(elem => elem === event.target.value)
      this.brendItem.splice(index, 1)
    }
  }

  filter() {
    let filterProduct: Array<any> = []; 
    this.product.forEach((elem: any) => {
      this.brendItem.forEach(brand => {
        if (elem.brand === brand) {
          filterProduct.push(elem)
        } else{
          this.userProducts = this.product
        }
      })
      if (elem.price >= this.value && elem.price <= this.maxvalue) {
        // filterProduct.push(elem)
        filterProduct = filterProduct.filter((item, index) => this.brand.indexOf(item._id) === index);
      }
    });
    this.userProducts = filterProduct
    console.log(filterProduct);
  }

  ngDoCheck(): void {
    this.range()
  }
  range(): void {
    if (this.rangeValue >= this.rangeValue2) {
      this.rangeValue2 = this.rangeValue + 1
    }
  }
  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe()
    } else if (this.routerSubscription) {
      this.routerSubscription.unsubscribe()
    }
  }
}
