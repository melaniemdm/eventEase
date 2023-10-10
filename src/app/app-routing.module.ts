import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from '../pages/calendar/calendar.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { LoginComponent } from './login/login.component';
import { InscriptionEventComponent } from './inscription-event/inscription-event.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { InscriptionLoginComponent } from './inscription-login/inscription-login.component';

const routes: Routes = [
  {path:'calendar', component:CalendarComponent},
  {path:'login', component:LoginComponent},
  {path:'inscription', component:InscriptionEventComponent},
  {path:'inscriptionLogin', component:InscriptionLoginComponent},
{path:'', component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
   BrowserAnimationsModule,
   BrowserModule,
    FormsModule, 
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
