import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicationsPage } from './medications.page';

const routes: Routes = [
  {
    path: '',
    component: MedicationsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicationsPageRoutingModule {}
