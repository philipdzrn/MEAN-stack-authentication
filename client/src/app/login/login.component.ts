import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err: HttpErrorResponse) => {
      console.error(err);
    }); 
  }
}
