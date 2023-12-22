import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Subject,
  Subscription,
  catchError,
  finalize,
  takeUntil,
  tap,
} from 'rxjs';
import { DataService } from 'src/app/core/service/data.service';
import { WeatherService } from 'src/app/core/service/weather.service';

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

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  weather: Weather[];
  main: Main;
  wind: Wind;
  sys: Sys;
  name: string;
}

export interface Coord {
  latitude: string;
  longitude: string;
}
@Component({
  selector: 'amr-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit, OnDestroy {
  @Input() formGroup!: FormGroup;
  @Input() public weather!: any;
  public minDateInicial = new Date();
  public maxDateInicial = new Date();
  public isLoading = false;
  public list = ['Adultos', 'Niños', 'Bebés', 'Bebés'];
  public items = ['Ida y Vuelta', 'Solo Ida', 'Varias Ciudades'];
  public people = ['Turista', 'Turista Premium', 'Bussines', 'Primera'];
  public quantities: number[] = [1, 1, 1, 1, 1];
  public selectedQuantities: number[] = [...this.quantities];
  public totalQuantity: number = 0;
  public selectedOption: string = 'Ida y Vuelta';
  public selectedTurista: string = 'Turista';
  public selectedPeople: string = '1';
  public dataInicial: string = 'Data Inicial';
  public dataFinal: string = 'Data Final';

  public flights: Flight[] = [];
  public informationFligth: any[] = [];

  private subscriptions = new Subscription();

  public informationFligthCard!: { label: string; value: string }[][];

  constructor(
    private flightService: DataService,
    private weatherService: WeatherService
  ) { }

  updateTotalQuantity() {
    this.totalQuantity = this.selectedQuantities.reduce(
      (acc, curr) => acc + curr,
      0
    );
  }

  onClick() {
    this.selectedQuantities = [...this.quantities];
  }

  incrementQuantity(event: Event, index: number) {
    if (this.selectedQuantities[index] < 9) {
      this.selectedQuantities[index]++;
      this.updateTotalQuantity();
    }
    event.stopPropagation();
  }

  decrementQuantity(event: Event, index: number) {
    if (this.selectedQuantities[index] > 1) {
      this.selectedQuantities[index]--;
      this.updateTotalQuantity();
    }
    event.stopPropagation();
  }

  getFlights(): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.flightService
        .getFlights()
        .pipe(
          catchError((error) => {
            throw error;
          }),
          tap((data) => {
            this.flights = data.slice(0, 5);
            this.getDataFligth();
            this.getFligthCard();
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe()
    );
  }

  public getDataFligth(): void {
    this.informationFligth = this.flights.map((flight) => [
      {
        label: flight.schedule,
        value: flight.airline,
      },
      {
        label: flight.duration,
        value: flight.airline,
      },
      {
        label: flight.transfer,
        value: flight.contingencies,
      },
      {
        label: flight.travelModes,
        value: flight.availableTransport,
      },
      {
        label: flight.price,
        value: flight.transfer,
      },
    ]);
  }

  public getFligthCard(): void {
    this.informationFligthCard = this.flights.map((flight) => [
      {
        label: flight.schedule,
        value: flight.airline,
      },
      {
        label: 'Emisiones de carbono estimadas',
        value: flight.travelModes,
      },
    ]);
  }

  getWeather(): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.weatherService
        .getWeatherData('Portugal')
        .pipe(
          catchError((error) => {
            throw error;
          }),
          tap((data) => {
            this.weather = data;
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe()
    );
  }

  ngOnInit(): void {
    this.getFlights();
    this.getWeather();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
