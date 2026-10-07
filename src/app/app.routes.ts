import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { GerenciarProdutos } from './pages/gerenciar-produtos/gerenciar-produtos';

export const routes: Routes = [
  {
    path: 'login', 
    component: Login
  },
  {
    path: 'gerenciar-produtos',
    component: GerenciarProdutos,
    title: 'Gerenciar Produtos'
  }
];
