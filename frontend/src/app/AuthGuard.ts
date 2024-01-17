import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {LoginService} from "./services/login.service";

export const authGuard: CanActivateFn = (state, route) => {
    const loginService: LoginService = inject(LoginService);
    const router: Router = inject(Router);
    if (!!loginService.user()) {
        return true;
    } else {
        router.navigate(['/login'], {})
            .then();
        return false;
    }
}
