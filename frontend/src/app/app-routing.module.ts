import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PlantationFormComponent } from './plantation-form/plantation-form.component';
import { SectorsFormComponent } from './sectors-form/sectors-form.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { OwnerMenuComponent } from './owner-menu/owner-menu.component';
import { PlantationListComponent } from './plantation-list/plantation-list.component';
import { DetailsComponent } from './details/details.component';
import { SectorsListComponent } from './sectors-list/sectors-list.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: OwnerMenuComponent},
  {path: '', component: OwnerMenuComponent},
  {path: 'map', component: PlantationFormComponent},
  {path: 'sectors', component: SectorsFormComponent},
  {path: 'user', component: UserMenuComponent},
  {path: 'menu', component: OwnerMenuComponent},
  {path: 'list', component: PlantationListComponent},
  {path: 'details', component: DetailsComponent},
  {path: 'seclist', component: SectorsListComponent},
  {path: 'employees', component: EmployeesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
