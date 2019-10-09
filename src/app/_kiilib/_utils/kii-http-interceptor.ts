import { Injectable,Inject, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor,HttpHeaders } from '@angular/common/http';
import {MatBottomSheet, MatBottomSheetRef, MatDialog} from '@angular/material';
import { KiiHttpErrorComponent } from '../_components/kii-http-error/kii-http-error.component';
import { Observable, throwError, Subscription } from 'rxjs';
import { map, filter, tap, catchError } from 'rxjs/operators';
import {User} from '../_models/user';
import { Router } from '@angular/router';
import { KiiApiLanguageService } from '../_services/kii-api-language.service';
import { KiiApiAuthService } from '../_services/kii-api-auth.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { LocalizeRouterService } from '../_libraries/localize-router/localize-router.service';

//We intercept all http requests and do some things here

@Injectable()
export class KiiHttpInterceptor implements HttpInterceptor {
    subscription: Subscription = new Subscription();

    constructor(private localize : LocalizeRouterService, 
        private bottomSheet: MatBottomSheet, 
        private kiiApiAuth: KiiApiAuthService,
        private kiiApiLanguage: KiiApiLanguageService, 
        private router: Router, 
        private translate: TranslateService,
        @Inject(PLATFORM_ID) private _platformId: Object, 
        @Optional() @Inject(REQUEST) private _request: Request,
        private dialog: MatDialog       
        ) {}
    
    /** Opens bottomsheet with error or success message */
    openBottomSheet(code:number,  message:string): void {
        if (isPlatformBrowser(this._platformId))
            this.bottomSheet.open(KiiHttpErrorComponent, {
                panelClass :"kii-http-error-panel-class",
                data: { 
                        code: code,
                        message: message
                    }
                });
    }


    /** Shortens message if it's too long */
    getText(msg:string) {
        if (msg)
            if (msg.length > 500) 
                msg = msg.substr(0, 500) + '...';
        return msg;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers : HttpHeaders;
        if (!isPlatformBrowser(this._platformId)) {
            //We are in the prefetch, so we need to pass the request language and authorization to the express server
            //Universal server asks express server
            if (request.headers.has("Authorization"))
                headers = new HttpHeaders({
                    'Accept-Language': this.kiiApiLanguage.get(),
                    'Authorization': request.headers.get('Authorization')
                });
            else
                headers = new HttpHeaders({
                    'Accept-Language': this.kiiApiLanguage.get()
                });                
        } else {
            //We are in the browser and then we do the request directly from browser to server
            if (User.getToken()) {
                headers = new HttpHeaders({
                    'Accept-Language': this.kiiApiLanguage.get(),
                    'Authorization': 'Bearer ' + User.getToken()
                });
            } else {
                headers = new HttpHeaders({
                    'Accept-Language': this.kiiApiLanguage.get(),
                });
            } 
            //When it's the browser we need to map the URL to the real domain
            console.log("REQUEST URL INITIAL:", request.url);
            request= request.clone({url: request.url.replace(environment.kiiserverURL,environment.kiiserverExtURL)});
            console.log("REQUEST URL FINAL:", request.url);
        }

        //When angular editor opens image we fall here
        if (request.url.includes("upload/editor") || request.url.includes("upload/videos") ) {
            headers = headers.append('enctype','multipart/form-data');

            const newUrl = {url : environment.apiURL + request.url};
            request = Object.assign(request, newUrl);
        }
        let newRequest = request.clone({headers});
        return next.handle(newRequest).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //console.log('event--->>>', event);
                    if (event.status == 200) {
                        if (event.body)
                            if (event.body.message)
                                if (event.body.message.show)
                                    if (event.body.message.show == true) {
                                        this.openBottomSheet(200,event.body.message.text);
                                    }

                    }

                }
                if (event) {

                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                switch(error.status) {
                    case 0:  //No internet on the server side, or server down
                        this.openBottomSheet(404,"");
                        break;
                    case 401:    //Invalid token
                        if (isPlatformBrowser(this._platformId)) {
                        User.removeToken();
                        this.kiiApiAuth.setLoggedInUser(new User(null));
                        //TODO: Add a translated message to error.error.message if is empty (it comes from token passport)
                        this.subscription = this.translate.get("kiilib.httperror.token").subscribe(message => {
                            if (error.error.message) 
                                this.openBottomSheet(error.status,error.error.message);
                            else 
                                this.openBottomSheet(error.status,message);
                            let translatedPath: any = this.localize.translateRoute('/login');
                            this.router.navigate([translatedPath]);
                        });

                        }
                        break;
                    default:
                        this.openBottomSheet(error.status,error.error.message);
                }
                return throwError(error);

            })
        );

    }
    ngOnDestroy() {
        this.subscription.unsubscribe();

    }
}