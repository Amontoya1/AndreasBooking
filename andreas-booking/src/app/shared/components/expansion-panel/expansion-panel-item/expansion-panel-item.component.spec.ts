import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelItemComponent } from './expansion-panel-item.component';

describe('ExpansionPanelItemComponent', () => {
  let component: ExpansionPanelItemComponent;
  let fixture: ComponentFixture<ExpansionPanelItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionPanelItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpansionPanelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
