import { Component } from '@angular/core';
import {ModalDeletarProduto} from './modal-deletar-produto/modal-deletar-produto';
import { ModalAdicionarProduto } from './modal-adicionar-produto/modal-adicionar-produto';

@Component({
  imports: [ModalDeletarProduto, ModalAdicionarProduto],
  selector: 'app-gerenciar-produtos',
  styleUrl: './gerenciar-produtos.css',
  templateUrl: './gerenciar-produtos.html',
})
export class GerenciarProdutos {}
