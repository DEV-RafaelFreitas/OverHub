import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-perfil-adm',
  styleUrl: './perfil-adm.css',
  templateUrl: './perfil-adm.html',
})
export class PerfilAdm {
  private router = inject(Router);
  private auth = inject(AuthService);

  admin = {
    nome: this.auth.usuario()?.nome ?? 'Administrador Exemplo',
    email: this.auth.usuario()?.email ?? 'admin@example.com',
    cpf: '123.456.789-00',
    telefone: '(11) 1234-5678'
  };

  novaSenha() {};

  excluirConta() {};

  // apenas adicionando o metodo de sair do user logado bb
  logout() {
    this.auth.sair();
    this.router.navigate(['/login']);
  }

  // navega pra pagina de gerenciamento de produtos 
  gerenciarProdutos() {
    this.router.navigate(['/gerenciar-produtos']);
  }

  gerenciarUsuarios() {}

  verificarPedidos() {};
}
