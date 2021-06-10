import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, iif, Observable, of, throwError } from "rxjs";
import { switchMap, share, map, catchError } from "rxjs/operators";
import { AccessToken, LoginParamsType, User } from "../infos/auth.info";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuReq$ = this.http.get<User>('/menu');
  private menu$ = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private token: TokenService) { 
      this.token
      .change()
      .pipe(
        switchMap(() => iif(() => this.token.valid(), this.menuReq$, of({ menu: [] }))),
        catchError(error => throwError(error))
      )
      .subscribe(menu => this.menu$.next(Object.assign({}, null, menu)));
  }

  menu() {
    return this.menu$.pipe(share());
  }

}