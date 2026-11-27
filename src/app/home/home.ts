import { Component, OnInit, ViewEncapsulation, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '@models/produto';
import { CarrinhoService } from '../services/carrinho.service';
import { inject } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None
})
export class Home implements OnInit {

  favoritos = inject(FavoritosService);
  produtos = signal<Produto[]>([]);
  carregando = signal(true);
  erro = signal(false);

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.carregando.set(true);
    this.erro.set(false);

    this.produtoService.listar().subscribe({
      next: (dados) => {
        this.produtos.set(dados);
        this.carregando.set(false);

        console.log('Produtos carregados:', dados);
      },
      error: (erro) => {
        console.error('Erro ao buscar produtos:', erro);
        this.erro.set(true);
        this.carregando.set(false);
      }
    });
  }

  toggleFavorito(event: MouseEvent): void {
    event.stopPropagation();

    const button = event.currentTarget as HTMLButtonElement;
    button.classList.toggle('ativo');
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.carrinhoService.adicionar(produto);
  }
}
