import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

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

    this.auth.buscarPorEmail(emailNormalizado).subscribe({
      next: (usuarios) => {
        const usuario = usuarios.find((u) => u.senha === senha);
        if (usuario) {
          this.auth.salvarSessao(usuario);
          if (usuario.perfil === 'admin') {
            this.router.navigate(['/perfil-admin']);
          } else {
            this.router.navigate(['/perfil-user']);
          }
        } else {
          alert('E-mail ou senha incorretos.');
          this.form.controls.senha.reset();
        }
      },
      error: () => {
        alert('Servidor fora do ar. Verifique se o json-server está rodando.');
      }
    });
  }
}
