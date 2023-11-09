import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // public sign !: FormGroup

  sign: FormGroup = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>('')
  })

  constructor(private log: AuthenticationService, private formBuilder: FormBuilder){


  }
  //   ngOnInit(): void {
  //   this.sign = this.formBuilder.group({
  //     email: [""],
  //     password: ["", Validators.required, Validators.minLength(3)]
  //   })
  // }
  

  login(){
    this.log.auth(this.sign.value.email, this.sign.value.password)
    console.log(this.sign.value)
  }

}


