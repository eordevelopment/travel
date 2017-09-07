import { Component, OnInit } from '@angular/core';
declare var MaterialDatetimePicker;

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.less']
})
export class DatepickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const picker = new MaterialDatetimePicker({})
    .on('submit', function(d) {
      console.log(d);
    });

  const el = document.querySelector('.c-datepicker-btn');
  el.addEventListener('click', function() {
    picker.open();
  }, false);
  }

}