import { Routes } from '@angular/router';
import { Home } from './home/home'; // Importe o seu componente Home

export const routes: Routes = [
  { path: '', component: Home },      // Acede em http://localhost:4200/
  { path: 'home', component: Home }   // Acede em http://localhost:4200/home
];