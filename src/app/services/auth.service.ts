import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Sessao {
  id: string;
  nome: string;
  email: string;
  perfil: 'cliente' | 'adm';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:3000/clientes';
  private readonly CHAVE = 'overhub_sessao';

  usuario = signal<Sessao | null>(this.lerSessao());
  logado = computed(() => this.usuario() !== null);
  ehAdm = computed(() => this.usuario()?.perfil === 'adm');

  login(email: string, senha: string): Observable<boolean> {
    return this.http
      .get<any[]>(this.API, { params: { email, senha } })
      .pipe(
        map((lista) => {
          const u = lista[0];
          if (!u) return false;
          const sessao: Sessao = { id: u.id, nome: u.nome, email: u.email, perfil: u.perfil ?? 'cliente' };
          this.usuario.set(sessao);
          sessionStorage.setItem(this.CHAVE, JSON.stringify(sessao));
          return true;
        })
      );
  }

  logout() {
    this.usuario.set(null);
    sessionStorage.removeItem(this.CHAVE);
  }

  private lerSessao(): Sessao | null {
    try {
      const txt = sessionStorage.getItem(this.CHAVE);
      return txt ? JSON.parse(txt) : null;
    } catch {
      return null;
    }
  }
}