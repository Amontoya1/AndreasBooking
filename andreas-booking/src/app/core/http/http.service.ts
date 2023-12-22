import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  HttpDeleteConfig,
  HttpGetConfig,
  HttpPostConfig,
  HttpPutConfig,
} from './http.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(public http: HttpClient) { }

  public get<T>({ url, params, headers }: HttpGetConfig): Observable<T> {
    return this.http.get<T>(url, { headers, params });
  }

  public post<T>({ url, body, headers }: HttpPostConfig): Observable<T> {
    return this.http.post<T>(url, body, { headers });
  }

  public put<T>({ url, body, headers }: HttpPutConfig): Observable<T> {
    return this.http.put<T>(url, body, { headers });
  }

  public delete<T>({ url, headers }: HttpDeleteConfig): Observable<T> {
    return this.http.delete<T>(url, { headers });
  }
}
