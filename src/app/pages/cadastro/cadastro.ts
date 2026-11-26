import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  imports: [FormsModule],
  selector: 'app-cadastro',
  styleUrl: './cadastro.css',
  templateUrl: './cadastro.html',
})
export class Cadastro {
  clientes = {
    nome: '',
    sobrenome: '',
    cpf: '',
    rg: '',
    email: '',
    senha: '',
    perfil: 'cliente'
  };
  confirmarSenha = '';
  aceitouTermos = false;

  private service = inject(ClienteService);
  private router = inject(Router);

  salvar() {
    const c = this.clientes;
    c.email = c.email.trim().toLowerCase();
    if (!c.nome || !c.sobrenome || !c.cpf || !c.rg || !c.email || !c.senha) {
      alert('Preencha todos os campos.');
      return;
    }
    if (c.senha !== this.confirmarSenha) {
      alert('As senhas não são iguais.');
      return;
    }
    if (!this.aceitouTermos) {
      alert('Você precisa aceitar os termos para continuar.');
      return;
    }

    this.service.incluir(c).subscribe({
      next: () => {
        alert('Conta criada com sucesso!');
        this.router.navigate(['/']);
      },
      error: () => alert('Erro ao criar conta. A API está rodando?'),
    });
  }
}