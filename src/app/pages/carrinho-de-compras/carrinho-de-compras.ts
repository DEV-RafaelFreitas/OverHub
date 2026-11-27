import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ItemCarrinho } from '@models/carrinho';
import { Pedido } from '@models/pedido';
import { ProdutoService } from '../../services/produto.service';
import { PedidoService } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  imports: [RouterLink],
  selector: 'app-carrinho-de-compras',
  styleUrl: './carrinho-de-compras.css',
  templateUrl: './carrinho-de-compras.html',
})
export class CarrinhoDeCompras implements OnInit {
  private produtoService = inject(ProdutoService);
  private pedidoService = inject(PedidoService);
  private AuthService = inject(AuthService);
  private router = inject(Router);
  private carrinho = inject(CarrinhoService);

  frete: number = 57.49;

  get itens(): ItemCarrinho[] {
    return this.carrinho.itens();
  }

  ngOnInit(): void {
    if (!this.AuthService.usuario()) {
      alert('Faça login para ver o seu carrinho.');
      this.router.navigate(['/login']);
      return;
    }

  }

  aumentar(item: ItemCarrinho): void {
    this.carrinho.aumentar(item);
  }

  diminuirOuRemover(item: ItemCarrinho): void {
    this.carrinho.diminuirOuRemover(item);
  }

  removerTodos(): void {
    if (confirm('Deseja remover todos os produtos do carrinho?')) {
      this.carrinho.limpar();
    }
  }

  get quantidadeTotal(): number {
    return this.carrinho.quantidadeTotal();
  }

  get subtotal(): number {
    return this.itens.reduce((soma, i) => soma + i.produto.preco * i.quantidade, 0);
  }

  get valorFrete(): number {
    return this.itens.length > 0 ? this.frete : 0;
  }

  get total(): number {
    return this.subtotal + this.valorFrete;
  }

  formatar(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  finalizarCompra(): void {
    const usuario = this.AuthService.usuario();

    if (!usuario) {
      alert('Faça login para finalizar a compra.');
      this.router.navigate(['/login']);
      return;
    }

    if (this.itens.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    const pedido: Pedido = {
      usuarioId: usuario.id,
      itens: this.itens.map(item => ({
        produtoId: item.produto.id!,
        nome: item.produto.nome,
        preco: item.produto.preco,
        quantidade: item.quantidade
      })),
      frete: this.valorFrete,
      total: this.total,
      data: new Date().toISOString()
    };

    this.pedidoService.incluir(pedido).subscribe({
      next: () => {
        this.itens.forEach(item => {
          item.produto.estoque = item.produto.estoque - item.quantidade;

          this.produtoService.editar(item.produto).subscribe({
            error: () => console.error('Erro ao atualizar o estoque de', item.produto.nome)
          });
        });

        alert('Compra finalizada com sucesso!');
        this.carrinho.limpar();

        if (usuario.perfil === 'admin') {
          this.router.navigate(['/perfil-admin']);
        } else {
          this.router.navigate(['/perfil-user']);
        }
      },
      error: () => alert('Erro ao finalizar a compra. O json-server está rodando?')
    });
  }
}