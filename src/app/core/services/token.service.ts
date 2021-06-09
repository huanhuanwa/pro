import { Injectable } from "@angular/core";
import { BehaviorSubject, timer } from "rxjs";
import { filter, share, switchMap, map } from "rxjs/operators";
import { RefreshToken, AccessToken } from "../infos/auth.info";
import { cache } from "../utils/storage-cache";
import { SimpleToken } from "./token";

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private key = 'access_token';
    private token: SimpleToken;
    private change$ = new BehaviorSubject<RefreshToken>(this.get());

    constructor() { }

    set(token: AccessToken, refresh = false) {
        cache.set(this.key, token.access_token);
        this.token = SimpleToken.create(token);
        this.change$.next(this.token.clone({ refresh }));

        return this;
    }
    get() {
        if (!this.token) {
            this.token = new SimpleToken(cache.get(this.key));
        }
        return this.token;
    }

    clear() {
        cache.remove(this.key);
        this.change$.next(null);
        this.token = null;
    }

    change() {
        return this.change$.pipe(
            filter(token => !token || !token.refresh),
            share()
        );
    }

    refresh() {
        return this.change$.pipe(
            filter(() => !!this.token && this.token.exp > 0),
            switchMap(() => timer(this.token.refreshTime())),
            filter(() => this.valid()),
            map(() => this.token),
            share()
        );
    }

    valid() {
        return !!this.token && this.token.valid();
    }

    headerValue() {
        return this.token.headerValue();
    }
}