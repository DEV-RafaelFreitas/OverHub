import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-perfil-adm',
  styleUrl: './perfil-adm.css',
  templateUrl: './perfil-adm.html',
})


export class PerfilAdm {
  admin = {
    nome: 'Administrador Exemplo',
    email: 'admin@example.com',
    cpf: '123.456.789-00',
    telefone: '(11) 1234-5678'
  };

  novaSenha() {
    // Fica vazio por enquanto
  };

  excluirConta() {
    // Fica vazio por enquanto
  };

  logout() {
    // Fica vazio por enquanto
  };

  gerenciarProdutos() {
    // Fica vazio por enquanto
  };

  gerenciarUsuarios() {
    // Fica vazio por enquanto
  }

  verificarPedidos() {
    // Fica vazio por enquanto
  };

}
