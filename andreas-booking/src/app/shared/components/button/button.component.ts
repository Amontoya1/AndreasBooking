import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgIconColorType, SvgIconType } from '../svg/svg.component';

export type ButtonThemeType = 'active' | 'iconSvg';

@Component({
  selector: 'amr-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() dataContext!: string;
  @Input() ariaLabel!: string;
  @Input() label!: string;
  @Input() isDisabled = false;
  @Input() disablePadding = false;
  @Input() isPrefixIcon = true;
  @Input() showButton = true;
  @Input() showButtonSvg = false;
  @Input() showMinWidth = true;
  @Input() buttonCustomWidth!: string;
  @Input() buttonCustomHeight!: string;
  @Input() buttonSvgIcon!: SvgIconType;
  @Input() buttonSvgIconWidthSize = '1rem';
  @Input() buttonSvgIconHeightSize = '1rem';
  @Input() buttonSvgIconTheme: SvgIconColorType = 'blue';
  @Input() buttonTheme: ButtonThemeType = 'active';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() showSvgIcon = false;
  @Input() svgIcon!: SvgIconType;
  @Input() svgIconWidthSize!: string;
  @Input() svgIconHeightSize!: string;
  @Input() svgIconColor: SvgIconColorType = 'white';
  @Output() clickEvent = new EventEmitter();

  constructor() { }

  public getProperty(property: ButtonThemeType) {
    const properties = {
      active: 'active',
      iconSvg: 'icon-svg',
    };

    return properties[property];
  }

  public getCustomClass(): string[] {
    const classes = [];
    if (this.getProperty(this.buttonTheme)) {
      classes.push(this.getProperty(this.buttonTheme));
    }

    if (this.showSvgIcon) {
      this.showButton = false;
      classes.push(this.getProperty('iconSvg'));
    }

    return classes;
  }

  public getCustomStyles() {
    return {
      width: '100%',
      minWidth: this.buttonCustomWidth ?? this.buttonCustomWidth,
      minHeight: this.buttonCustomHeight ?? this.buttonCustomHeight,
    };
  }

  public emitClick() {
    if (this.isDisabled) {
      return;
    }
    this.clickEvent.emit();
  }
}
