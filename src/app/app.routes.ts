import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CarrinhoDeCompras } from './pages/carrinho-de-compras/carrinho-de-compras';

export const routes: Routes = [
    {path: 'login', component: Login},
    { path: 'carrinho', component: CarrinhoDeCompras },
];
