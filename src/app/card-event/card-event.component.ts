import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.scss']
})
export class CardEventComponent implements OnInit{
  @Input() titleEvent: string ='';
  @Input() date: string ='';
  @Input() heureStart: string ='';
  @Input() heureEnd: string ='';
  @Input() event: any;
  constructor() { }

  ngOnInit(): void {
  }
}
