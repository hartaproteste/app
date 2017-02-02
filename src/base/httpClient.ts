import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';
import { CONFIG_TOKEN, IConfig } from '../providers/config';
import 'rxjs/add/operator/share';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Cookie } from 'ng2-cookies';


@Injectable()
export class HttpClient {

    public loading: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(private http: Http, @Inject(CONFIG_TOKEN) private config: IConfig) {
        
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.loading.next(this.loading.value + 1);
        options = this.createAuthHeader(options);
        let retValue = this.http.get(this.config.url + url, options).share();
        retValue
        .catch(() => { return Observable.of(true); })
        .subscribe(res => this.loading.next(this.loading.value - 1));
        return retValue;
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.loading.next(this.loading.value + 1);
        options = this.createAuthHeader(options);
        let retValue = this.http.delete(this.config.url + url, options).share();
        retValue
        .catch(() => { return Observable.of(true); })
        .subscribe(res => this.loading.next(this.loading.value - 1));
        return retValue;
    }

    post(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
        this.loading.next(this.loading.value + 1);
        options = this.createAuthHeader(options);
        if (data !== null)
            options.headers.append('Content-Type', 'application/json');
        let retValue = this.http.post(this.config.url + url, data, options).share();
        retValue
        .catch(() => { return Observable.of(true); })
        .subscribe(res => this.loading.next(this.loading.value - 1));
        return retValue;
    }

    private createAuthHeader(options: RequestOptionsArgs): RequestOptionsArgs {
        let headers = new Headers({'Accept': 'application/json'}); 
        
        let authToken = Cookie.get('auth_token');
        if (authToken !== '') {
            headers.append('Authorization', 'Bearer ' + authToken);
        }

       if (!options)
            options = new RequestOptions({ headers: headers });
            
        options.headers = headers;
        
        return options;
    }
}
