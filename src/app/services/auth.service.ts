import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

// Usuário como está no db.json
export interface UsuarioDb {
  id: number | string;
  nome: string;
  email: string;
  senha: string;
  perfil: 'cliente' | 'admin';
}

// O que guardamos no localStorage
export interface Sessao {
  id: number | string;
  nome: string;
  email: string;
  perfil: 'cliente' | 'admin';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly api = 'http://localhost:3000/usuarios';

  // Guarda quem está logado. Inicia lendo do localStorage para manter o login ao dar F5.
  usuario = signal<Sessao | null>(this.lerSessao());

  // Busca no json-server o usuário pelo e-mail
  buscarPorEmail(email: string) {
    return this.http.get<UsuarioDb[]>(`${this.api}?email=${encodeURIComponent(email)}`);
  }

  // Salva no localStorage e atualiza o signal do usuário logado
  salvarSessao(usuario: UsuarioDb): void {
    const sessao: Sessao = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
    };
    localStorage.setItem('sessao', JSON.stringify(sessao));
    this.usuario.set(sessao);
  }

  // Faz o logout limpando o localStorage e o signal
  sair(): void {
    localStorage.removeItem('sessao');
    this.usuario.set(null);
  }

  private lerSessao(): Sessao | null {
    try {
      const texto = localStorage.getItem('sessao');
      return texto ? JSON.parse(texto) : null;
    } catch {
      return null;
    }
  }
}
