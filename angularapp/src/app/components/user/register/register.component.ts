import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../login/login.component';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';
import { DisposeBag } from '@ronas-it/dispose-bag';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,  OnDestroy{

  message = '  '
  signupForm:FormGroup;
  dispBag = new DisposeBag();

  constructor(
    private fBuilder:FormBuilder,
    private http:HttpService,
    private userService:UserService
  ) { 
    this.signupForm = this.fBuilder.group({
      name:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,CustomValidators.validatePassword]]
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
		this.dispBag.unsubscribe()
  }
  
  submit(){
    this.message = null;
    this.dispBag.add(
      this.http.signUp(this.signupForm.value).subscribe(
        user=> {
          this.message = `User ${this.signupForm.value.name} is registered !`
          this.signupForm.reset();
        },
        err => this.message = err.error.message
      )
    )
  }

  get signupFormControl() {
    return this.signupForm.controls;
  }

}
