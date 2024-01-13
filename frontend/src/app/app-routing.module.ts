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
import { HarvestComponent } from './harvest/harvest.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: PlantationListComponent},
  {path: '', component: PlantationListComponent},
  {path: 'map', component: PlantationFormComponent},
  {path: 'sectors/:id', component: SectorsFormComponent},
  {path: 'user', component: UserMenuComponent},
  {path: 'menu', component: OwnerMenuComponent},
  {path: 'list', component: PlantationListComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'seclist', component: SectorsListComponent},
  {path: 'employees', component: EmployeesListComponent},
  {path: 'harvest', component: HarvestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
