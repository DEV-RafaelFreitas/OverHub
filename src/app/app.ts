import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarrinhoDeCompras } from './pages/carrinho-de-compras/carrinho-de-compras';

@Component({
  imports: [CarrinhoDeCompras],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('overhub');
}
