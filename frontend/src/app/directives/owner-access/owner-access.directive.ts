import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

const OWNER: string = 'ROLE_OWNER';

@Directive({
    selector: '[appOwnerAccess]',
    standalone: true
})
export class OwnerAccessDirective implements AfterViewInit {


    constructor(private _elementRef: ElementRef, private _loginService: AuthenticationService) {
    }


    ngAfterViewInit(): void {
        if (this._loginService.user().role.name !== OWNER) {
            this._elementRef.nativeElement.remove();
        }
    }

}
