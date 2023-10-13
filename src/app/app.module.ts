import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigateComponent } from './navigate/navigate.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from '../pages/calendar/calendar.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { InscriptionEventComponent } from './inscription-event/inscription-event.component';
import { CardEventComponent } from './card-event/card-event.component';
import { HttpClientModule } from '@angular/common/http';
import { InscriptionLoginComponent } from './inscription-login/inscription-login.component';
import { ApiService } from './services/api.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigateComponent,
    CalendarComponent,
    HomeComponent,
    LoginComponent,
    InscriptionEventComponent,
    CardEventComponent,
    InscriptionLoginComponent,
     ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule ,
    AppRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [ApiService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
