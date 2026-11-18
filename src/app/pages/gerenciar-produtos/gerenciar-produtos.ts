import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '@models/produto';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-gerenciar-produtos',
  styleUrl: './gerenciar-produtos.css',
  templateUrl: './gerenciar-produtos.html',
})
export class GerenciarProdutos implements OnInit {
  private service = inject(ProdutoService);
  private cdr = inject(ChangeDetectorRef);

  produtos: Produto[] = [];
  carregando: boolean = false;
  mensagem: string = '';

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.cdr.markForCheck();
    this.service.listar().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.carregando = false;
        this.cdr.markForCheck();
      },
      error: (erro) => {
        console.error('Erro ao listar produtos:', erro);
        this.mensagem = 'Erro ao carregar lista de produtos. Certifique-se de que o json-server está rodando!';
        this.carregando = false;
        this.cdr.markForCheck();
      }
    });
  }

  excluir(id?: number | string): void {
    if (id !== undefined && confirm('Deseja realmente excluir o produto?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.produtos = this.produtos.filter(p => p.id !== id);
          this.cdr.markForCheck();
          alert('Produto excluído com sucesso!');
        },
        error: (erro) => {
          console.error('Erro ao excluir produto:', erro);
          alert('Erro ao excluir o produto.');
        }
      });
    }
  }
}
