import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-perfil-adm',
  styleUrl: './perfil-adm.css',
  templateUrl: './perfil-adm.html',
})
export class PerfilAdm {
  private router = inject(Router);

  admin = {
    nome: 'Administrador Exemplo',
    email: 'admin@example.com',
    cpf: '123.456.789-00',
    telefone: '(11) 1234-5678'
  };

  novaSenha() {};

  excluirConta() {};

  logout() {};

  gerenciarProdutos() {
    this.router.navigate(['/gerenciar-produtos']);
  }

  gerenciarUsuarios() {}

  verificarPedidos() {};
}
