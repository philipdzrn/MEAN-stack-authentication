import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  public details: UserDetails | null = null;

  constructor(private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.auth.profile().subscribe((user: UserDetails) => {
      this.details = user;
    }, (err: HttpErrorResponse) => {
      console.error(err);
    });
  }
}
