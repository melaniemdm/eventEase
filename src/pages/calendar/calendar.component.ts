import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
viewDate:Date = new Date();
view: CalendarView= CalendarView.Week;
CalendarView=CalendarView;

events:CalendarEvent[] = [];

activeDayIsOpen = false;
constructor(){
  const event1 = {
    title:"Mélanie",
    start:new Date("2023-10-09T10:30"),
    end:new Date("2023-10-09T12:00"),
  }
  const event2 = {
    title:"Jordan",
    start:new Date("2023-10-09T10:30"),
    end:new Date("2023-10-09T12:00"),
  }
  this.events.push(event1,event2)
}

setView(view: CalendarView){
this.view = view;
}
dayClicked({date, events}:{date:Date; events: CalendarEvent[]}): void{
  if(isSameMonth(date, this.viewDate)){
    if(
      (isSameDay(this.viewDate, date)&& this.activeDayIsOpen === true)|| 
      events.length === 0
    ){
      this.activeDayIsOpen = false;
    }else{
      this.activeDayIsOpen = true
    }
    this.viewDate = date;
  }
}

}
