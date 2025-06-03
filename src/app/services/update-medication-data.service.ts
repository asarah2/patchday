import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  private medicationDataSubject = new BehaviorSubject<any>(this.loadData());
  medicationData$ = this.medicationDataSubject.asObservable();

  constructor() {}

  private loadData() {
    const storedData = sessionStorage.getItem('medicationData');
    const initialData = storedData ? JSON.parse(storedData) : [];
    console.log('Loaded data from sessionStorage:', initialData); // Log the loaded data
    return initialData;
  }

  updateMedicationData(newData: any) {
    console.log('Updating medication data:', newData); // Log the new data being set
    sessionStorage.setItem('medicationData', JSON.stringify(newData));
    this.medicationDataSubject.next(newData);
    console.log('New medication data emitted to subscribers.'); // Log the emission of new data
  }
}
