import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  termoBusca: string = '';
  cartCount: number = 0;

  fazerBusca(termo: string): void {
    if (termo.trim()) {
      // Redireciona via Router ou lógica de busca do Angular
      window.location.href = `/produtos?busca=${encodeURIComponent(termo)}`;
    }
  }
}