import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "./services/authentication.service";

export const authGuard: CanActivateFn = (state, route) => {
    const loginService: AuthenticationService = inject(AuthenticationService);
    const router: Router = inject(Router);
    if (!!loginService.user()) {
        return true;
    } else {
        router.navigate(['/login'], {})
            .then();
        return false;
    }
}
