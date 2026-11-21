import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-perfil-user',
  styleUrl: './perfil-user.css',
  templateUrl: './perfil-user.html',
})
export class PerfilUser {
  private router = inject(Router);
  private auth = inject(AuthService);

  usuario = {
    nome: this.auth.usuario()?.nome ?? 'Cliente Exemplo',
    cpf: '123.456.789-00',
    email: this.auth.usuario()?.email ?? 'cliente.exemplo@example.com',
    telefone: '(10) 456-7890',
    dataNascimento: '1990-01-01',
    pais: 'Brasil',
    estado: 'SP',
    cidade: 'São Paulo',
    bairro: 'Centro',
    endereco: 'Rua Exemplo',
    numero: '123',
    complemento: 'Apto 101',
    cep: '01234-567',
    senha: 'password123',
    confirmarSenha: 'password123'
  };
  
  enderecoEntrega = {
    endereco: 'Rua da Entrega',
    numero: '454',
    complemento: 'Apto 101',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '09876-543' 
  };  

  alterarDados() {}

  novaSenha() {}

  excluirConta() {}

  // apenas adicionando o metodo de sair do user logado bb
  logout() {
    this.auth.sair();
    this.router.navigate(['/login']);
  }

  historicoCompras() {}
}
