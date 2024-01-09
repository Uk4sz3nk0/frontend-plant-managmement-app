import {Component} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  sign: FormGroup = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>('')
  })

  constructor(private log: AuthenticationService, private formBuilder: FormBuilder) {


  }


  login() {
    this.log.auth(this.sign.value.email, this.sign.value.password)
    console.log(this.sign.value)
    this.sign.reset()
  }

}


