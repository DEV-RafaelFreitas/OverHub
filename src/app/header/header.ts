import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  protected auth = inject(AuthService);
  private router = inject(Router);

  termoBusca: string = '';
  cartCount: number = 0;

  // apenas adicionando o metodo de sair do user logado bb
  sair(): void {
    this.auth.sair();
    this.router.navigate(['/login']);
  }

  fazerBusca(termo: string): void {
    if (termo.trim()) {
      window.location.href = `/produtos?busca=${encodeURIComponent(termo)}`;
    }
  }
}
