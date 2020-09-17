import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms'
import { UserService, User } from 'src/app/service/user.service';
import { HttpService } from 'src/app/service/http.service';
import { DisposeBag } from '@ronas-it/dispose-bag';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm:FormGroup;
  message:string = '  ';
  dispBag = new DisposeBag();
  
  constructor(
    private fBuilder:FormBuilder,
    private http:HttpService,
    private userService:UserService
  ) { 
    this.loginForm = this.fBuilder.group({
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
      this.http.signIn(this.loginForm.value).subscribe(
        (user:User)=> {
          this.userService.login(user)
          this.message = `Welcome ${user.name} !`
          this.loginForm.reset();
        },
        err => this.message = err.error.message
      )
    )
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

}


//Custom validator
export class CustomValidators extends Validators {
  static validatePassword(control: FormControl) {
    if (control.value && control.value.length > 0) {
      // match the control value against the regular expression
      const matches = /^(?=.*\d).{6,20}$/.test(control.value)
      return matches == false ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }
}
