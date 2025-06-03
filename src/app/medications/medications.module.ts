import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicationsPage } from './medications.page';
import { MedicationsPageRoutingModule } from './medications-routing.module';
import { AddMedicationsModalComponentModule } from '../add-medications-modal/add-medications-modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MedicationsPageRoutingModule,
    AddMedicationsModalComponentModule
  ],
  declarations: [MedicationsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MedicationsPageModule {}
