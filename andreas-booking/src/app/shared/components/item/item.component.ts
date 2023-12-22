import { Component, Input } from '@angular/core';

export interface IContentItem {
  id?: string | number;
  label?: string;

  value: string | number;

  iconContent?: {
    icon: string;
  };
}


@Component({
  selector: 'amr-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() label!: string;
  @Input() item!: IContentItem;




}
