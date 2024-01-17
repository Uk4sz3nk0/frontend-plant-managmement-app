import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PlantationFormComponent} from './plantation-form/plantation-form.component';
import {SectorsFormComponent} from './sectors-form/sectors-form.component';
import {UserMenuComponent} from './user-menu/user-menu.component';
import {OwnerMenuComponent} from './owner-menu/owner-menu.component';
import {PlantationListComponent} from './plantation-list/plantation-list.component';
import {DetailsComponent} from './details/details.component';
import {SectorsListComponent} from './sectors-list/sectors-list.component';
import {EmployeesListComponent} from './employees-list/employees-list.component';
import {HarvestComponent} from './components/harvest/harvest.component';
import {UserDetailsComponent} from "./components/user-details/user-details.component";
import {authGuard} from "./AuthGuard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: PlantationListComponent, canActivate: [authGuard]},
  {
    path: 'menu', component: OwnerMenuComponent, canActivate: [authGuard], children: [
      {path: 'home', component: PlantationListComponent, canActivate: [authGuard]},
      {path: 'map', component: PlantationFormComponent, canActivate: [authGuard]},
      {path: 'sectors/:id', component: SectorsFormComponent, canActivate: [authGuard]},
      {path: 'user', component: UserMenuComponent, canActivate: [authGuard]},
      {path: 'list', component: PlantationListComponent, canActivate: [authGuard]},
      {path: 'details/:id', component: DetailsComponent, canActivate: [authGuard]},
      {path: 'seclist', component: SectorsListComponent, canActivate: [authGuard]},
      {path: 'employees', component: EmployeesListComponent, canActivate: [authGuard]},
      {path: 'harvest', component: HarvestComponent, canActivate: [authGuard]},
      {path: 'user-details', component: UserDetailsComponent, canActivate: [authGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
