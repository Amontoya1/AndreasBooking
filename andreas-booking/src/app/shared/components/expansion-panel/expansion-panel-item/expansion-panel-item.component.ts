import { IContentItem } from './../../item/item.component';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'amr-expansion-panel-item',
  templateUrl: './expansion-panel-item.component.html',
  styleUrls: ['./expansion-panel-item.component.scss']
})
export class ExpansionPanelItemComponent {
  @Input()
  public title!: string;

  @Input()
  public disabled!: boolean;

  @Input()
  public expanded!: boolean;

  @Output()
  public opened: EventEmitter<void> = new EventEmitter<void>();

  public animationsDisabled = true;

  @Input() item!: IContentItem;
  @ViewChild('panelContent') panelContent!: ElementRef;

  constructor() { }

  public ngAfterViewInit(): void {
    setTimeout(() => (this.animationsDisabled = false));
  }

  public onOpenExpansionPanel(): void {
    this.expanded = true;
    this.opened.emit();
  }

  public onCloseExpansionPanel(): void {
    this.expanded = false;
  }

  public scrollToTop() {
    if (this.panelContent) {
      this.panelContent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
