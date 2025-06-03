import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { medicationData } from 'src/assets/medication-data/medication-data';
import { MedicationInfo } from 'src/models/medication-info';
import { MedicationService } from '../services/update-medication-data.service';

@Component({
  selector: 'app-no-medications-error',
  templateUrl: './no-medications-error.component.html',
  styleUrls: ['./no-medications-error.component.scss'],
})
export class NoMedicationsErrorComponent {
  constructor() {}
  errorMessage: string = 'Looks like you have no medications added';
}
