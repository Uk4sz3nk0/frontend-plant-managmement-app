import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import {LoginService} from "../../services/login.service";

@Directive({
  selector: '[EmployeeAccess]',
  standalone: true
})
export class EmployeeAccessDirective implements AfterViewInit{

  constructor(private _elementRef: ElementRef, private _loginService: LoginService) {
  }


  ngAfterViewInit(): void {
    if (this._loginService.user().role.name !== 'ROLE_USER') {
      this._elementRef.nativeElement.remove();
    }
  }

}
