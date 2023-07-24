import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
} from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
		if (!this.authService.userAuth$.value?.token) {
			return this.router.createUrlTree(['/login']);
		} else {
			return true;
		}
	}
}
