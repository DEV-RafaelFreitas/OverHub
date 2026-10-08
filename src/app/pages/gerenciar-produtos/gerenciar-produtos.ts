import { Component } from '@angular/core';
import { ModalDeletarProduto } from './modal-deletar-produto/modal-deletar-produto';
import { ModalAdicionarProduto } from './modal-adicionar-produto/modal-adicionar-produto';
import { ModalEditarProduto } from './modal-editar-produto/modal-editar-produto';


type ModalType = 'editar' | 'deletar' | 'adicionar' | null;

@Component({
  imports: [ModalDeletarProduto, ModalAdicionarProduto, ModalEditarProduto],
  selector: 'app-gerenciar-produtos',
  styleUrl: './gerenciar-produtos.css',
  templateUrl: './gerenciar-produtos.html',
})
export class GerenciarProdutos {

  modalAtivo: ModalType = null;

  openDeleteModal() {
    this.modalAtivo = 'deletar';
  }

  openAddModal() {
    this.modalAtivo = 'adicionar';
  }
  openEditModal() {
    this.modalAtivo = 'editar';
  }

  closeModal() {
    this.modalAtivo = null;
  }
}
