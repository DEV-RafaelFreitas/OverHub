import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { GerenciarProdutos } from './pages/gerenciar-produtos/gerenciar-produtos';
import { Home } from './home/home';
import { CarrinhoDeCompras } from './pages/carrinho-de-compras/carrinho-de-compras';
import { PerfilAdm } from './shared/perfil-adm/perfil-adm';
import { PerfilUser } from './shared/perfil-user/perfil-user';

export const routes: Routes = [
  { 
    path: '', 
    component: Home,
	title: 'Página inicial'
  },
  {
    path: 'login', 
	component: Login,
	title: 'Login'
  },
  { 
    path: 'carrinho',
	component: CarrinhoDeCompras,
	title: 'Carrinho'
  },
  {
    path: 'perfil-admin',
	component: PerfilAdm,
	title: ''
  },
  {
    path: 'perfil-user',
	component: PerfilUser
  },
  {
    path: 'gerenciar-produtos',
    component: GerenciarProdutos,
    title: 'Gerenciar Produtos'
  }
];


