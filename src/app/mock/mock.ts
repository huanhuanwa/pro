import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccessToken, User } from '../core/infos/auth.info';

function urlSafeBase64Encode(text: string) {
    return btoa(text).replace(/[+/=]/g, m => {
        return { '+': '-', '/': '_', '=': '' }[m];
    });
}

function urlSafeBase64Decode(text: string) {
    return atob(
        text.replace(/[-_]/g, m => {
            return { '-': '+', '_': '/' }[m];
        })
    );
}

function is(reqInfo: RequestInfo, path: string) {
    if (environment.baseUrl) {
        return false;
    }
    return new RegExp(`${path}(/)?$`, 'i').test(reqInfo.req.url);
}

function generateToken(user: User): AccessToken {
    const expiresIn = 3600;
    const header = JSON.stringify({ typ: 'JWT', alg: 'HS256' });
    const payload = JSON.stringify({ exp: Math.ceil(new Date().getTime() / 1000) + expiresIn, user });
    const key = 'ngx-tethys';

    const accessToken = [
        urlSafeBase64Encode(header),
        urlSafeBase64Encode(payload),
        urlSafeBase64Encode(key),
    ].join('.');

    return {
        access_token: accessToken,
        token_type: 'ngx-tethys',
        expires_in: expiresIn,
    };
}

function getUserFromJWTToken(req: HttpRequest<any>) {
    console.log(12345)
    const authorization = req.headers.get('Authorization');
    const [, token] = authorization.split(' ');

    try {
      const [, payload] = token.split('.');
  
      const data = JSON.parse(urlSafeBase64Decode(payload));
      const d = new Date();
      d.setUTCSeconds(data.exp);
      if (new Date().getTime() > d.getTime()) {
        return null;
      }
  
      return data.user;
    } catch (e) {
      return null;
    }
  }

@Injectable({
    providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
    private users: User[] = [
        {
            id: 1,
            username: 'admin',
            password: 'admin',
        },
        {
            id: 2,
            username: 'user',
            password: 'user',
        },
    ];

    createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
        return { users: this.users };
    }

    get(reqInfo: RequestInfo) {
        if (is(reqInfo, 'me')) {
            return reqInfo.utils.createResponse$(() => {
              const { headers, url } = reqInfo;
              const user = getUserFromJWTToken(reqInfo.req as HttpRequest<any>);
      
              if (!user) {
                return { status: STATUS.UNAUTHORIZED, headers, url, body: {} };
              }
      
              return { status: STATUS.OK, headers, url, body: user };
            });
          }
        return null;
    }

    post(reqInfo: RequestInfo) {
        if (is(reqInfo, 'auth/login')) {
            return this.login(reqInfo);
        }
        return null
    }

    private login(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            const { headers, url } = reqInfo;
            const req = reqInfo.req as HttpRequest<any>;
            const { username, password } = req.body;
            const currentUser = this.users.find(user => user.username === username)
            if (!currentUser) {
                return { status: STATUS.UNAUTHORIZED, headers, url, body: {} };
            }
            if (currentUser.password !== password) {
                return {
                    status: STATUS.UNPROCESSABLE_ENTRY,
                    headers,
                    url,
                    error: 'The provided password is incorrect.',
                };
            }

            delete currentUser.password;
            return { status: STATUS.OK, headers, url, body: generateToken(currentUser) };
        });
    }
}