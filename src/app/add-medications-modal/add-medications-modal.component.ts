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
  selector: 'app-add-medications-modal',
  templateUrl: './add-medications-modal.component.html',
  styleUrls: ['./add-medications-modal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [animate('500ms', style({ opacity: 1 }))]),
      transition('* => void', [animate('350ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AddMedicationsModalComponent {
  @ViewChild(IonModal) modal!: IonModal;

  medtypes = [
    { title: 'Pills', icon: 'assets/icon/pills.svg' },
    { title: 'Patches', icon: 'assets/icon/patches.svg' },
    { title: 'Injections', icon: 'assets/icon/injections.svg' },
    { title: 'Gel', icon: 'assets/icon/gel.svg' },
  ];

  medicationSites = [
    'Right Quad',
    'Left Quad',
    'Right Glute',
    'Left Glute',
    'Left Delt',
    'Right Delt',
    'Select All',
  ];

  frequencyTypes = [
    'Daily',
    'Bi-weekly',
    'Twice a Day',
    'Weekly',
    'Twice a month',
    'Other',
  ];

  pickedMedicationType: string = '';
  pickedFrequencyType: string = '';
  pickedMedicationName: string = '';
  resetMedicationType: boolean = false;
  resetFrequencyType: boolean = false;
  selectedSites: boolean[] = new Array(this.medicationSites.length).fill(false);

  public medicationData = medicationData;
  public medicationSearchResults = [...this.medicationData];
  public name: string = '';
  public message: string =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';

  constructor(private medicationService: MedicationService) {}
  cancel() {
    this.resetAddMedicationModal();
    this.modal.dismiss(null, 'cancel');
  }

  checkSelectAll(site: string) {
    if (site === 'Select All') {
      const allSelected = this.selectedSites.every(Boolean);
      this.selectedSites.fill(!allSelected);
    }
  }

  confirm() {
    const selectedSiteNames = this.medicationSites.filter(
      (_, index) => this.selectedSites[index]
    );

    const currentDate = new Date();

    const medicationInfo = {
      medicationName: this.pickedMedicationName,
      pickedMedicationType: this.pickedMedicationType,
      pickedFrequencyType: this.pickedFrequencyType,
      selectedSites: selectedSiteNames,
      nextDoseTime: {
        dateString: currentDate.toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
        }),
        timeString: currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    };

    this.storeMedicationData(medicationInfo);

    this.resetAddMedicationModal();
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  setMedicationType(medicationType: string) {
    this.pickedMedicationType = medicationType;
  }

  setFrequencyType(frequencyType: string) {
    this.pickedFrequencyType = frequencyType;
  }

  setMedicationName(medicationName: string) {
    this.pickedMedicationName = medicationName;
  }

  handleMedicationNameSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.medicationSearchResults = this.medicationData.filter((d) =>
      d.toLowerCase().includes(query)
    );
  }

  storeMedicationData(newMedicationInfo: MedicationInfo) {
    const existingData = localStorage.getItem('medicationData') || '[]';
    let medicationDataArray: any[] = [];
    medicationDataArray = JSON.parse(existingData);
    if (!Array.isArray(medicationDataArray)) {
      medicationDataArray = [];
    }

    medicationDataArray.push(newMedicationInfo);

    localStorage.setItem('medicationData', JSON.stringify(medicationDataArray));
    this.medicationService.updateMedicationData(
      JSON.stringify(medicationDataArray)
    );
  }

  resetAddMedicationModal() {
    this.pickedMedicationType = '';
    this.pickedFrequencyType = '';
    this.pickedMedicationName = '';
    this.selectedSites.fill(false);
  }
}
