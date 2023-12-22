import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  public getWeatherData(city: string): Observable<any> {
    return this.http.get(environment.XRapidAPIKeyValue, {
      headers: new HttpHeaders()
        .set(environment.XRapidAPIHost, environment.XRapidAPIHostValue)
        .set(environment.XRapidAPIKey, environment.XRapidAPIKeyValue),
      params: new HttpParams().set("q", city).set("units", "metrics").set("mode", "json")
    });
  }
}
