import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from '../pages/calendar/calendar.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'calendar', component:CalendarComponent},
  {path:'login', component:LoginComponent},
{path:'', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
   BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
