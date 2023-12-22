import { Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormGroup, NgControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { Subscription } from 'rxjs';


@Component({
  selector: 'amr-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss'],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class PickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() placeholder!: string;
  @Input() startView = 'month';
  @Input() label!: string;
  @Input() mensagemPadronizado!: string;
  @Input() customErrorMessages: string[] = [];
  @Input() dataMinimaMensagem = '';
  @Input() dataMaximaMensagem!: string;
  @Input() minDate!: Date | string;
  @Input() maxDate!: Date | string;
  @Input() maxlength!: number;
  @Input() dataForm = false;
  @Output() formChange = new EventEmitter();
  @Output() toggleIconEvent = new EventEmitter();

  /*  @Output()
   dateChange: EventEmitter<MatDatepickerInputEvent<any>>; */

  @Output()
  selectedChanged: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('fromInput', {
    read: MatInput
  })
  fromInput!: any;
  public formGroup!: FormGroup;
  public dataErrorMessages!: string;
  private innerValue: any;
  private subscriptions = new Subscription();

  @Input() get value() {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChangeFn(value);
      this.onTouchedFn();
    }
  }

  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  public get control() {
    return this.controlDir.control;
  }

  public get controlVerifications() {
    return {
      value: !this.controlDir?.value,
      dirty: this.controlDir.dirty
    };
  }

  public isControlInvalid(): boolean {
    return !!(this.controlDir?.invalid && (this.controlDir?.dirty || this.controlDir?.touched));
  }

  public onTouchedFn: () => void = () => { };
  public onChangeFn: (value: any) => void = () => { };

  public writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public fromPicker(event: any) {
    this.value = event;
    this.selectedChanged.emit(this.value);
    this.onChangeFn(this.value);
  }

  public valueChanged(date: any) {
    this.value = date;
    this.formChange.emit(this.control);
    this.onChangeFn(this.value);
  }

  public onRemove(): void {
    this.fromInput.value = '';
    this.control?.reset();
  }

  toggleIcon(date: HTMLInputElement) {
    this.clearDate(date);

    this.toggleIconEvent.emit(date);
  }

  clearDate(date: HTMLInputElement) {
    date.value = '';
    this.control?.setValue('');
    this.control?.reset();
  }

  private setInputDatesMessages(): void {
    const dataMaximaControl = this.control?.errors?.matDatepickerMax?.max;
    const dataMinimaControl = this.control?.errors?.matDatepickerMin?.min;

    if (this.control?.errors?.matDatepickerMax) {
      this.dataErrorMessages = this.dataMaximaMensagem
        ? this.dataMaximaMensagem
        : `A data máxima é ${dataMaximaControl?.format('DD/MM/YYYY')}`;
    }
    if (this.control?.errors?.matDatepickerMin) {
      this.dataErrorMessages = this.dataMinimaMensagem
        ? this.dataMinimaMensagem
        : `A data mínima é ${dataMinimaControl?.format('DD/MM/YYYY')}`;
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.control?.valueChanges.subscribe(value => {
        this.value = value;
        this.setInputDatesMessages();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
