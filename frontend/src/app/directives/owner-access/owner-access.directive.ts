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
      console.log(this._loginService.user())
        if (this._loginService.user().role.name !== OWNER) {
            console.log('THERE IS NOT OWNER')
            this._elementRef.nativeElement.remove();
        }
    }

}
