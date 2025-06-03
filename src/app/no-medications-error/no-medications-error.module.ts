import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddMedicationsModalComponent } from './no-medications-error.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [AddMedicationsModalComponent],
  exports: [AddMedicationsModalComponent]
})
export class AddMedicationsModalComponentModule {}
