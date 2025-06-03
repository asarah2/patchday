import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {
  constructor() {}
  isNotificationsOn: boolean = true;
  minutes: number = 0;

  updateMinutes(event: any) {
    this.minutes = event.detail.value;
  }
}
