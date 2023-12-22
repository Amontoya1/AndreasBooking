import { Component, Input } from '@angular/core';

export type SvgIconType =

  | 'chevron-left'
  | 'attention'
  | 'people'
  | 'search'
  | 'search-people'
  | 'browse-arrow'
  | 'browse'
  | 'currency'
  | 'language'
  | 'position'
  | 'application'
  | 'light'
  | 'home'
  | 'hotel'
  | 'flight'
  | 'search-world'
  | 'menu'
  | 'default'
  | 'bag';

export type SvgIconColorType =
  | 'blue'
  | 'grey'
  | 'grey-dart'
  | "white";

@Component({
  selector: 'amr-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss'],
})
export class SvgComponent {
  @Input() svg: SvgIconType = 'home';
  @Input() color: SvgIconColorType = 'blue';
  @Input() width = '1.6rem';
  @Input() height = '1.6rem';
  @Input() viewBox = '0 0 23 21';
  @Input() customSvg!: string;
  @Input() customFill!: string;

  constructor() { }

  public getProperty(property: SvgIconColorType): string {
    const properties = {
      'blue': 'blue',
      'grey': 'grey',
      'grey-dart': 'grey-dart',
      "white": "white"
    };

    return properties[property];
  }

  public get _width(): string {
    return this.width;
  }

  public get _height(): string {
    return this.height;
  }

  public get _customFill(): string {
    return this.customFill;
  }

  public getClass(): string[] {
    const classes = [];

    if (this.getProperty(this.color)) {
      classes.push(this.getProperty(this.color));
    }

    return classes;
  }



  public getViewBox(): string {
    return this.viewBox;
  }
}
