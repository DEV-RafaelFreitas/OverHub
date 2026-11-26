import { Component, ViewEncapsulation, inject } from '@angular/core'; // ADICIONADO: "inject" no import
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; // ADICIONADO: "Router" no import

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  // ADICIONADO: injeta o Router, usado no sair() para redirecionar ao login
  private router = inject(Router);

  termoBusca: string = '';
  cartCount: number = 0;

  fazerBusca(termo: string): void {
    if (termo.trim()) {
      // Redireciona via Router ou lógica de busca do Angular
      window.location.href = `/produtos?busca=${encodeURIComponent(termo)}`;
    }
  }

  // ADICIONADO: indica se há alguém logado.
  // O login grava "perfil" no sessionStorage; se existir, o usuário está logado.
  logado(): boolean {
    return sessionStorage.getItem('perfil') !== null;
  }

  // ADICIONADO: devolve a rota do perfil conforme o tipo de usuário.
  // Admin vai para /perfil-admin; qualquer outro (cliente) vai para /perfil-user.
  rotaPerfil(): string {
    return sessionStorage.getItem('perfil') === 'admin' ? '/perfil-admin' : '/perfil-user';
  }

  // ADICIONADO: encerra a sessão.
  // clear() apaga perfil e nome do sessionStorage, então os guards voltam a bloquear
  // as páginas protegidas.
  sair(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}