import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, share, switchMap, tap } from 'rxjs/operators';
import { AccessToken } from "../../infos/auth.info";
import { cache } from "../../utils/storage-cache";

export type LoginParamsType = {
    username: string;
    password: string;
};

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    constructor(private http: HttpClient) { }

    fakeGetCurrentUser(){
        return this.http.get('/me')
    }
}