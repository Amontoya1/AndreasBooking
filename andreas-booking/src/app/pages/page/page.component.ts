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
import { Flight } from 'src/app/shared/interfaces/fligth';
import { WeatherData } from 'src/app/shared/interfaces/weather';

@Component({
  selector: 'amr-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit, OnDestroy {
  @Input() formGroup!: FormGroup;
  @Input() public weather!: WeatherData;
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
  public informationFligthCard!: { label: string; value: string }[][];
  public city: string = 'Portugal';
  public informationFligth: any[] = [];
  private subscriptions = new Subscription();

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

  getWeather(city: string): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.weatherService
        .getWeatherData(city)
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

  public onSubmit() {
    this.getWeather(this.city);
    this.city = '';
  }

  ngOnInit(): void {
    this.getFlights();
    this.getWeather(this.city);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
