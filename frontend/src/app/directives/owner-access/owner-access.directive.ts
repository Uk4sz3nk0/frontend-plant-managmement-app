import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import {LoginService} from "../../services/login.service";

const OWNER: string = 'ROLE_OWNER';

@Directive({
  selector: '[OwnerAccess]',
  standalone: true
})
export class OwnerAccessDirective implements AfterViewInit {


  constructor(private _elementRef: ElementRef, private _loginService: LoginService) {
  }


  ngAfterViewInit(): void {
    if (this._loginService.user().role.name !== OWNER) {
      this._elementRef.nativeElement.remove();
    }
  }

}
