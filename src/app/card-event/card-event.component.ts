import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.scss']
})
export class CardEventComponent {
  @Input() eventTitle: string ='';
  @Input() eventDate: string ='';
  @Input() heureEvent: string ='';
}
