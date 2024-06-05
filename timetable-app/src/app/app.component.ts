import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  day: string = '';
  startTime: string = '';
  endTime: string = '';
  subject: string = '';
  schedule: Array<{ day: string, startTime: string, endTime: string, subject: string }> = [];

  constructor() {
    this.loadSchedule();
  }

  addClass() {
    if (this.day && this.startTime && this.endTime && this.subject) {
      this.schedule.push({
        day: this.day,
        startTime: this.startTime,
        endTime: this.endTime,
        subject: this.subject
      });
      this.saveSchedule();
      this.clearFields();
    } else {
      alert("All fields are required");
    }
  }

  removeClass(subject: string) {
    this.schedule = this.schedule.filter(cls => cls.subject !== subject);
    this.saveSchedule();
  }

  clearFields() {
    this.day = '';
    this.startTime = '';
    this.endTime = '';
    this.subject = '';
  }

  saveSchedule() {
    localStorage.setItem('schedule', JSON.stringify(this.schedule));
  }

  loadSchedule() {
    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule) {
      this.schedule = JSON.parse(savedSchedule);
    }
  }
}
