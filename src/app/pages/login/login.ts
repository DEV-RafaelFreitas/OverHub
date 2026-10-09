import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

type Perfil = 'admin' | 'cliente';
 
interface UsuarioTeste {
  email: string;
  senha: string;
  perfil: Perfil;
}


const USUARIOS_TESTES: UsuarioTeste[] =[
  { email: 'admin@gmail.com', senha: '123456', perfil: 'admin' },
  { email: 'cliente@gmail.com', senha: '123456', perfil: 'cliente' },
];
const ROTA_POR_PERFIL: Record<Perfil, string> = {
  admin: '/perfil-admin',
  cliente: '/perfil-user',
} //precisa definir a rota ate a manutencao de produtos e perfil do user
@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})

export class Login {

    private readonly fb = inject (FormBuilder);
    private readonly router = inject(Router);

    protected readonly erroLogin = signal(false);

    protected readonly form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],

    });


    protected campoInvalido(nome: 'email' | 'senha'): boolean{
      const campo = this.form.controls[nome];
      return campo.invalid && (campo.touched || campo.dirty);
    }


    protected entrar(): void{

        if(this.form.invalid){
          this.form.markAllAsTouched();
          return;
        }
    

      const { email, senha } = this.form.getRawValue();
      const emailNormalizado = email.trim().toLowerCase();


      const usuario = USUARIOS_TESTES.find(
        (u) => u.email == emailNormalizado && u.senha === senha,
      );


      if(usuario){
        void this.router.navigateByUrl(ROTA_POR_PERFIL[usuario.perfil]);
        return;
      }

        alert('E-mail ou senha incorretos.');
        this.form.controls.senha.reset();

    }

}
