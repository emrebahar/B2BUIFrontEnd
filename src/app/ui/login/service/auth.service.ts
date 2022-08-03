import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { LoginModel } from '../model/login-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private httpClient: HttpClient,
    private router: Router,
    private errorService: ErrorService
  ) {}

  isAuth(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }

    return false;
  }

  login(loginForm: any) {
    let api = this.apiUrl + 'Auth/CustomerLogin';
    let model: LoginModel = new LoginModel();
    model.email = loginForm.value.email;
    model.password = loginForm.value.email;

    this.httpClient.post(api, model).subscribe(
      (res) => {
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorService.errorHandler(err);
      }
    );
  }
}
