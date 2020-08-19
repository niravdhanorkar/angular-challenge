import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { BodyInterface } from './model';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('404')) {
      const body : BodyInterface = {
        timestamp: new Date().getTime(),
        message: 'Failed',
        status: Number(req.urlWithParams),
      };
      return of(new HttpResponse({ status: 404, body: body }));
    } else {
      const body = {
        timestamp: new Date().getTime(),
        message: 'Success',
        status: Number(req.urlWithParams),
      };
      return of(new HttpResponse({ status: 200, body: body }));
    }
  }
}
