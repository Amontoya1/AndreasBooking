import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Flight {
  schedule: string;
  airline: string;
  duration: string;
  transfer: string;
  price: string;
  svg?: string;
  ariaLabel: string;
  emissions: string;
  availableTransport: string;
  contingencies: string;
  travelModes: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = `${environment.apiBaseUrl}/api/flights`;

  constructor(private http: HttpClient) { }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }
}
