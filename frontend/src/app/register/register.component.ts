import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    firstname: new FormControl<string>(''),
    lastname: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
    role: new FormControl<string>('')
  })

  constructor(private formBuilder: FormBuilder, private reg: RegistrationService){}

  register(){
    this.reg.register(this.form.value.firstname, this.form.value.lastname, this.form.value.email, this.form.value.password,this.form.value.role)
    this.form.reset()
  }
}
