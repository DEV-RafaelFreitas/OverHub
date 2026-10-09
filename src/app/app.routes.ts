import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { GerenciarProdutos } from './pages/gerenciar-produtos/gerenciar-produtos';
import { Home } from './home/home';
import { CarrinhoDeCompras } from './pages/carrinho-de-compras/carrinho-de-compras';
import { PerfilAdm } from './shared/perfil-adm/perfil-adm';
import { PerfilUser } from './shared/perfil-user/perfil-user';
import { Cadastro } from './pages/cadastro/cadastro';

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
    path: 'cadastro',
    component: Cadastro,
    title: 'Cadastro'
  },
  { 
    path: 'carrinho',
    component: CarrinhoDeCompras,
    title: 'Carrinho'
  },
  {
    path: 'perfil-admin',
    component: PerfilAdm,
    title: 'Perfil Administrador'
  },
  {
    path: 'perfil-user',
	  component: PerfilUser,
    title: 'Perfil Cliente'
  },
  {
    path: 'gerenciar-produtos',
    component: GerenciarProdutos,
    title: 'Gerenciar Produtos'
  }
];


