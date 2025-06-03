import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { MedicationService } from '../services/update-medication-data.service';

@Component({
  selector: 'app-medications',
  templateUrl: 'medications.page.html',
  styleUrls: ['medications.page.scss'],
})
export class MedicationsPage implements AfterViewInit {
  constructor(private medicationService: MedicationService) {}

  @ViewChild(IonModal) modal!: IonModal;

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';
  medicationData: any;

  medicationNames: string[] = [];
  medicationTypes: string[] = [];
  frequencyTypes: string[] = [];
  allSelectedSites: string[][] = [];

  ngAfterViewInit(): void {
    this.medicationService.medicationData$.subscribe((data) => {
      this.medicationData = data;
      this.parseMedicationData();
    });
  }

  parseMedicationData() {
    const storedData = localStorage.getItem('medicationData');
    this.medicationData = storedData ? JSON.parse(storedData) : [];
    this.medicationData.forEach((medication: any) => {
      const { dateString, timeString } = this.calculateNextDoseTime(
        medication.pickedFrequencyType,
        medication.nextDoseTime.dateAdded
      );
      medication.nextDoseTime = { dateString, timeString };
    });
  }

  calculateNextDoseTime(frequency: string, dateAdded: string) {
    const date = new Date(dateAdded);

    switch (frequency) {
      case 'Daily':
        date.setDate(date.getDate() + 1);
        break;
      case 'Weekly':
        date.setDate(date.getDate() + 7);
        break;
      case 'Bi-weekly':
        date.setDate(date.getDate() + 14);
        break;
      case 'Twice a Day':
        date.setHours(date.getHours() + 12);
        break;
      case 'Twice a month':
        date.setDate(date.getDate() + 15);
        break;
      case 'Other':
        break;
    }

    const timeString = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateString = date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
    });

    return { dateString, timeString };
  }

  onComplete(medication: any) {
    const dateString = this.postponeDose(
      medication.pickedFrequencyType,
      medication.nextDoseTime.dateString
    );

    const timeString = medication.nextDoseTime.timeString;

    medication.nextDoseTime = { dateString, timeString };
     console.log(medication.nextDoseTime)
    localStorage.setItem('medicationData', JSON.stringify(this.medicationData));
  }

  postponeDose(frequency: string, dateAdded: string) {
    const date = new Date(dateAdded);
    console.log(date)
    switch (frequency) {
      case 'Daily':
        date.setDate(date.getDate() + 1);
        break;
      case 'Weekly':
        date.setDate(date.getDate() + 7);
        break;
      case 'Bi-weekly':
        date.setDate(date.getDate() + 14);
        break;
      case 'Twice a Day':
        date.setHours(date.getHours() + 12);
        break;
      case 'Twice a month':
        date.setDate(date.getDate() + 15);
        break;
      case 'Other':
        break;
    }

    const dateString = date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
    });

    return dateString;
  }

  getIconForType(type: string): string {
    switch (type) {
      case 'Patches':
        return 'assets/icon/patches.svg';
      case 'Pills':
        return 'assets/icon/pills.svg';
      case 'Injections':
        return 'assets/icon/injections.svg';
      default:
        return 'assets/icon/injections.svg';
    }
  }
}
