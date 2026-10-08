import { Component } from '@angular/core';
import {ModalDeletarProduto} from './modal-deletar-produto/modal-deletar-produto';
import { ModalAdicionarProduto } from './modal-adicionar-produto/modal-adicionar-produto';
import { ModalEditarProduto } from './modal-editar-produto/modal-editar-produto';

@Component({
  imports: [ModalDeletarProduto, ModalAdicionarProduto, ModalEditarProduto],
  selector: 'app-gerenciar-produtos',
  styleUrl: './gerenciar-produtos.css',
  templateUrl: './gerenciar-produtos.html',
})
export class GerenciarProdutos {}
