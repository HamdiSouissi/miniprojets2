import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgApexchartsModule }  from 'ng-apexcharts';

import { CovidDataService } from './covid-data-service';
import { DatePipe } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { LiveStatComponent } from './live-stat/live-stat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogOverviewExampleDialog, InfirmierComponent, updateInfirmier } from './infirmier/infirmier.component';
import { PatientComponent } from './patient/patient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MDCDialog } from '@material/dialog';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    LiveStatComponent,
    InfirmierComponent,
    PatientComponent,
    DialogOverviewExampleDialog,
    updateInfirmier
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule

  ],
  providers: [CovidDataService, DatePipe,HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
