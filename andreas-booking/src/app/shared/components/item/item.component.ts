import { Component, Input } from '@angular/core';

export interface IContentItem {
  id?: string | number;
  label?: string;
  value: string | number;
  itemCsse: string;
  iconContent?: {
    icon: string;
  };
}

@Component({
  selector: 'amr-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() label!: string;
  @Input() item!: IContentItem;

  constructor() { }

  public applyClasses(item: any): string {
    if (item.itemCss === 'full') {
      return 'content full';
    } else if (item.itemCss === 'equally') {
      return 'content equally';
    } else {
      return 'content';
    }
  }
}
