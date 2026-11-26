import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

type Perfil = 'admin' | 'cliente';

const ROTA_POR_PERFIL: Record<Perfil, string> = {
  admin: '/perfil-admin',
  cliente: '/perfil-user',
};

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  protected readonly erroLogin = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected campoInvalido(nome: 'email' | 'senha'): boolean {
    const campo = this.form.controls[nome];
    return campo.invalid && (campo.touched || campo.dirty);
  }

  protected entrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, senha } = this.form.getRawValue();
    const emailNormalizado = email.trim().toLowerCase();

    this.http
      .get<any[]>('http://localhost:3000/clientes', {
        params: { email: emailNormalizado, senha },
      })
      .subscribe({
        next: (lista) => {
          const usuario = lista[0];
          if (!usuario) {
            this.erroLogin.set(true);
            alert('E-mail ou senha incorretos.');
            this.form.controls.senha.reset();
            return;
          }
          const perfil: Perfil = usuario.perfil ?? 'cliente';
          sessionStorage.setItem('perfil', perfil);
          sessionStorage.setItem('nome', usuario.nome);
          void this.router.navigateByUrl(ROTA_POR_PERFIL[perfil]);
        },
        error: () => alert('Erro ao conectar. A API está rodando?'),
      });
  }
}