import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './home/home'; // Importe o seu componente Home
import { CarrinhoDeCompras } from './pages/carrinho-de-compras/carrinho-de-compras';
import { PerfilAdm } from './shared/perfil-adm/perfil-adm';
import { PerfilUser } from './shared/perfil-user/perfil-user';

export const routes: Routes = [
  { path: '', component: Home },      // Acede em http://localhost:4200/
  { path: 'login', component: Login}, // Acede em http://localhost:4200/home
  { path: 'carrinho', component: CarrinhoDeCompras },
  { path: 'perfil-admin', component: PerfilAdm},
  { path: 'perfil-user', component: PerfilUser}
];


