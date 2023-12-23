import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/shared/interfaces/weather';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  public getWeatherData(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(environment.openWeather + city, {
      headers: new HttpHeaders()
        .set(environment.XRapidAPIHost, environment.XRapidAPIHostValue)
        .set(environment.XRapidAPIKey, environment.XRapidAPIKeyValue),
      params: new HttpParams()
        .set('q', city)
        .set('units', 'metrics')
        .set('mode', 'json'),
    });
  }
}
