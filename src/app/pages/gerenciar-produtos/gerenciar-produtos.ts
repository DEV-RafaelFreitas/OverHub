import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDeletarProduto } from './modal-deletar-produto/modal-deletar-produto';
import { ModalAdicionarProduto } from './modal-adicionar-produto/modal-adicionar-produto';
import { ModalEditarProduto } from './modal-editar-produto/modal-editar-produto';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '@models/produto';

type ModalType = 'editar' | 'deletar' | 'adicionar' | null;

@Component({
  imports: [CommonModule, ModalDeletarProduto, ModalAdicionarProduto, ModalEditarProduto],
  selector: 'app-gerenciar-produtos',
  styleUrl: './gerenciar-produtos.css',
  templateUrl: './gerenciar-produtos.html',
})
export class GerenciarProdutos implements OnInit {
  private produtoService = inject(ProdutoService);

  produtos: Produto[] = [];
  modalAtivo: ModalType = null;
  produtoSelecionado: Produto | null = null;
  produtoParaDeletar: Produto | null = null;
  carregando: boolean = false;
  mensagem: string = '';

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.produtoService.listarProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao listar produtos:', erro);
        this.mensagem = 'Erro ao carregar lista de produtos. Certifique-se de que o json-server está rodando!';
        this.carregando = false;
      }
    });
  }

  openAddModal() {
    this.modalAtivo = 'adicionar';
  }

  openEditModal(produto: Produto) {
    this.produtoSelecionado = { ...produto };
    this.modalAtivo = 'editar';
  }

  openDeleteModal(produto: Produto) {
    this.produtoParaDeletar = produto;
    this.modalAtivo = 'deletar';
  }

  closeModal() {
    this.modalAtivo = null;
    this.produtoSelecionado = null;
    this.produtoParaDeletar = null;
  }

  onProdutoAdicionado(novoProduto: Produto) {
    this.produtoService.adicionarProduto(novoProduto).subscribe({
      next: () => {
        this.carregarProdutos();
        this.closeModal();
      },
      error: (erro) => {
        console.error('Erro ao adicionar produto:', erro);
        alert('Erro ao salvar produto no json-server.');
      }
    });
  }

  onProdutoEditado(produtoAtualizado: Produto) {
    this.produtoService.editarProduto(produtoAtualizado).subscribe({
      next: () => {
        this.carregarProdutos();
        this.closeModal();
      },
      error: (erro) => {
        console.error('Erro ao atualizar produto:', erro);
        alert('Erro ao atualizar produto no json-server.');
      }
    });
  }

  onProdutoDeletado() {
    if (this.produtoParaDeletar?.id != null) {
      this.produtoService.deletarProduto(this.produtoParaDeletar.id).subscribe({
        next: () => {
          this.carregarProdutos();
          this.closeModal();
        },
        error: (erro) => {
          console.error('Erro ao deletar produto:', erro);
          alert('Erro ao excluir produto no json-server.');
        }
      });
    }
  }
}
