import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { GerenciarProdutos } from './pages/gerenciar-produtos/gerenciar-produtos';
import { ProdutoFormComponent } from './pages/produto-form/produto-form';
import { Home } from './home/home';
import { CarrinhoDeCompras } from './pages/carrinho-de-compras/carrinho-de-compras';
import { PerfilAdm } from './shared/perfil-adm/perfil-adm';
import { PerfilUser } from './shared/perfil-user/perfil-user';
import { Cadastro } from './pages/cadastro/cadastro';
import { guard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home, title: 'Página inicial' },
  { path: 'login', component: Login, title: 'Login' },
  { path: 'cadastro', component: Cadastro, title: 'Cadastro' },
  { path: 'carrinho', component: CarrinhoDeCompras, title: 'Carrinho' },

  {
    path: 'perfil-user',
    component: PerfilUser,
    title: 'Perfil Cliente',
    canActivate: [guard('cliente')],
  },

  {
    path: 'perfil-admin',
    component: PerfilAdm,
    title: 'Perfil Administrador',
    canActivate: [guard('admin')],
  },
  {
    path: 'gerenciar-produtos',
    component: GerenciarProdutos,
    title: 'Gerenciar Produtos',
    canActivate: [guard('admin')],
  },
  {
    path: 'produto-cadastro',
    component: ProdutoFormComponent,
    title: 'Cadastro de Produto',
    canActivate: [guard('admin')],
  },
  {
    path: 'produto-editar/:id',
    component: ProdutoFormComponent,
    title: 'Alteração de Produto',
    canActivate: [guard('admin')],
  },

  { path: 'produtos', component: GerenciarProdutos, title: 'Produtos' },
];

sessionStorage.clear();