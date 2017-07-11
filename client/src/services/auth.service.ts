// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  public userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'Z1RDkTTTfSVbLfqCrLQRodQtiIWxCnNR',
    domain: 'rankitall.auth0.com',
    responseType: 'token id_token',
    audience: 'https://rankitall.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000/search',
    scope: 'openid profile email'
  });

  constructor(public router: Router) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {

    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getProfile((err, profile) => {
            this.userProfile = profile; 
            console.log(this.userProfile);
        });
        this.router.navigate(['/search']); // was /home  
      } else if (err) {
        this.router.navigate(['/search']); // was /home
        console.log(err);
      }
    });

  }

  public getProfile(cb): void { 
    var accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt); 
    
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    this.userProfile = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}