import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, Subscription, tap } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	form: FormGroup;
	isCreate = false;
	errorMessage = '';

	constructor(
		private readonly authService: AuthService,
		private readonly formBuilder: FormBuilder,
		private readonly router: Router
	) {
		this.form = this.formBuilder.group({
			name: ['', [Validators.required]],
			userName: ['', [Validators.required]],
			password: ['', [Validators.required]],
		});

		this.form.get('name')?.disable();
		const userNameField = this.getFormController('userName');

		const subscription = userNameField.valueChanges.subscribe((value = '') => {
			userNameField.patchValue(value.toLowerCase().replaceAll(' ', ''), {
				onlySelf: true,
				emitEvent: false,
			});
		});

		this.subscriptions.push(subscription);
	}

	public ngOnInit(): void {
		this.authService.setAuth(null);
	}

	public ngOnDestroy(): void {
		for (const sub of this.subscriptions) {
			sub.unsubscribe();
		}
	}

	public onSave(): void {
		if (this.form.invalid) {
			this.errorMessage = 'Preencher todos os campos.';
			return;
		}

		const save$ = this.isCreate
			? this.authService.signIn(this.form.value)
			: this.authService.login(this.form.value);

		const subscription = save$
			.pipe(
				tap(
					() => this.router.navigate(['/home']),
					error => (this.errorMessage = error)
				)
			)
			.subscribe();

		this.subscriptions.push(subscription);
	}

	public onCreateChange() {
		this.isCreate = !this.isCreate;

		if (this.isCreate) {
			this.form.get('name')?.enable();
		} else {
			this.form.get('name')?.disable();
		}
	}

	public getFormController(
		fieldName: 'userName' | 'name' | 'password'
	): AbstractControl {
		return this.form.get(fieldName)!;
	}
}
