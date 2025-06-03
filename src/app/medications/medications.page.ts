import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { MedicationService } from '../services/update-medication-data.service';

@Component({
  selector: 'app-medications',
  templateUrl: 'medications.page.html',
  styleUrls: ['medications.page.scss'],
})
export class MedicationsPage implements AfterViewInit, OnDestroy {
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
  timer: any;

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
      medication.timeRemaining = this.getTimeRemaining(medication.nextDoseTime);
    });
    this.startTimers();
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

  startTimers() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.medicationData.forEach((med: any) => {
        med.timeRemaining = this.getTimeRemaining(med.nextDoseTime);
      });
    }, 1000);
  }

  getTimeRemaining(nextDose: { dateString: string; timeString: string }) {
    const nextDoseDate = this.parseNextDoseDate(nextDose);
    const diff = nextDoseDate.getTime() - new Date().getTime();
    if (diff <= 0) {
      return '00:00:00';
    }
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0')
    );
  }

  parseNextDoseDate(nextDose: { dateString: string; timeString: string }) {
    const [month, day] = nextDose.dateString.split('/').map((v) => parseInt(v, 10));
    const now = new Date();
    const year = now.getFullYear();
    let [time, modifier] = nextDose.timeString.split(' ');
    let [hourStr, minuteStr] = time.split(':');
    let hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);
    if (modifier) {
      modifier = modifier.toLowerCase();
      if (modifier.includes('pm') && hours < 12) {
        hours += 12;
      }
      if (modifier.includes('am') && hours === 12) {
        hours = 0;
      }
    }
    return new Date(year, month - 1, day, hours, minutes);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
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
