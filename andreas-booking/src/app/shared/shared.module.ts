import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickerComponent } from './components/picker/picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { SvgComponent } from './components/svg/svg.component';
import { ButtonComponent } from './components/button/button.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpansionPanelContainerComponent } from './components/expansion-panel/expansion-panel-container/expansion-panel-container.component';
import { ExpansionPanelItemComponent } from './components/expansion-panel/expansion-panel-item/expansion-panel-item.component';
import { ItemComponent } from './components/item/item.component';

const COMPONENTS = [
  PickerComponent,
  HeaderComponent,
  FooterComponent,
  SvgComponent,
  ButtonComponent,
  ExpansionPanelContainerComponent,
  ExpansionPanelItemComponent,
  ItemComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatExpansionModule,
  ],
})
export class SharedModule { }
