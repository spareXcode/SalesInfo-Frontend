import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  userLoginInputDetails : FormGroup = new FormGroup({
    userName: new FormControl(''),
    userPassword: new FormControl('')
  })


  onSubmit(){
    console.log(this.userLoginInputDetails)
  }
  

}
