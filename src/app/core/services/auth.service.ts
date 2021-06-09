import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { switchMap, share, map } from "rxjs/operators";
import { AccessToken, LoginParamsType, User } from "../infos/auth.info";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userReq$ = this.http.get<User>('/me');
  private user$ = new BehaviorSubject<User>(null);
  
  constructor(private http: HttpClient, private token: TokenService) { 
      this.token
      .change()
      .pipe(switchMap(() => (this.check() ? this.userReq$ : of(null))))
      .subscribe(user => this.user$.next(Object.assign({}, null, user)));
  }

  check() {
      return this.token.valid();
  }

  user() {
      return this.user$.pipe(share());
  }

  fakeAccountLogin(params: LoginParamsType) {
      return this.http.post('/auth/login', { ...params }).pipe(
          map((response: AccessToken) => {
              if (response.access_token) {
                  this.token.set(response);
              }
              return response;
          })
      );
  }
}