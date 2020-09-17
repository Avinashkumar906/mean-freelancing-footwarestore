import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { ProductService, Product } from 'src/app/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DisposeBag } from '@ronas-it/dispose-bag';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit, OnDestroy {

  id:string;
  message = '  '
  file:File = null;
  env = environment;
  productForm:FormGroup;
  dispBag = new DisposeBag();

  constructor(
    private fBuilder:FormBuilder,
    private http:HttpService,
    private productService:ProductService,
    private route:ActivatedRoute,
    private orderService : OrderService
  ) { 
    this.initForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (query)=>{
        if(query && query._id && this.productService.getProduct(query._id)){
          this.patchProductForm(this.productService.getProduct(query._id))
          this.id = query._id;
        } else {
          this.patchProductForm(null)
        }
      }
    )
  }

  ngOnDestroy(): void {
		this.dispBag.unsubscribe()
  }
  
  initForm(){
    this.productForm = this.fBuilder.group({
      name:['',[Validators.required,Validators.minLength(4)]],
      cost:['',[Validators.required]],
      quantity:['',[Validators.required]],
      company:['',[Validators.required]],
      description:['',[Validators.required]],
      size:this.fBuilder.array([]),
      image:[''],
    })
  }

  patchProductForm(product:Product){
    this.initForm()
    let control = (this.productForm.get('size') as FormArray);
    if(product){
      this.id = product._id;
      product.size.forEach((item,index)=>{
        control.insert(index,new FormControl(item))
      })
      this.productForm.patchValue(product);
    } else {
      control.insert(0,new FormControl(10))
      this.id = null;
      this.file = null;
    }
  }

  newProduct(){
    this.message = null;
    if(this.file){
      let formdata = new FormData()
      formdata.append('file',this.file,this.file.name)
      formdata.append('body',JSON.stringify(this.productForm.value))
      this.dispBag.add(
        this.http.postProduct(formdata).subscribe(
          (product:Product)=>{
            this.message="product uploaded to DB"
            this.orderService.clearCart()
            this.productService.putProduct(product)
          },
          err=>this.message = err.error.message
        )
      )
    } else {
      this.message = "Please select a Imgae !"
    }
  }

  updateProduct(){
    this.message = null
    this.dispBag.add(
      this.http.updateProduct(this.productForm.value,this.id).subscribe(
        (product:Product)=>{
          this.message="Product updated !"
          this.orderService.clearCart()
          this.productService.patchedProduct(product)
        },
        err=>this.message = err.error.message
      )
    )
  }

  submit(){
    if(!this.id){
      this.newProduct()
    } else {
      this.updateProduct()
    }
  }

  reset(){
    this.initForm()
    let control = (this.productForm.get('size') as FormArray);
    control.insert(0,new FormControl(10));
    this.file = undefined;
    this.id = undefined;
    this.message = '  ';
  }

  handleFile(event){
    this.file = <File>event.target.files[0]
  }

  addSize(element){
    let control = (this.productForm.get('size') as FormArray);
    control.push(new FormControl(element.value))
    element.value = '';
  }
  removeSize(index){
    let control = this.productForm.get('size') as FormArray;
    if(control.length>1){
      control.removeAt(index)
    } else {
      alert('Atleast one item is mandatory!')
    }
  }

  get sizeArrayControl(){
    return (this.productForm.get('size') as FormArray).controls;
  }

  get productFormControl() {
    return this.productForm.controls;
  }

}
