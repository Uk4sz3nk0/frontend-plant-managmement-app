import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';


import {GoogleMapsModule} from '@angular/google-maps'

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HomeComponent} from './home/home.component';
import {MatListModule} from '@angular/material/list';
import {PlantationFormComponent} from './plantation-form/plantation-form.component';
import {OwnerMenuComponent} from './owner-menu/owner-menu.component';
import {UserMenuComponent} from './user-menu/user-menu.component';
import {SectorsFormComponent} from './sectors-form/sectors-form.component';
import {PlantationListComponent} from './plantation-list/plantation-list.component';
import {DetailsComponent} from './details/details.component';
import {HarvestComponent} from './harvest/harvest.component';
import {SectorsListComponent} from './sectors-list/sectors-list.component';
import {SectorsDetailsComponent} from './sectors-details/sectors-details.component';
import {EmployeesListComponent} from './employees-list/employees-list.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {AuthInterceptorService} from "./services/auth-interceptor.service";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PlantationFormComponent,
    OwnerMenuComponent,
    UserMenuComponent,
    SectorsFormComponent,
    PlantationListComponent,
    DetailsComponent,
    HarvestComponent,
    SectorsListComponent,
    SectorsDetailsComponent,
    EmployeesListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    GoogleMapsModule,
    MatStepperModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
