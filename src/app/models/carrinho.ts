import { Produto } from './produto';

// Um produto dentro do carrinho, com a quantidade escolhida
export class ItemCarrinho {
  constructor(
    public produto: Produto,
    public quantidade: number,
  ) {}
}

// Cada cliente tem o seu carrinho
export class Carrinho {
  constructor(
    public id: number,
    public clienteId: number,          // dono do carrinho
    public itens: ItemCarrinho[] = [], // começa vazio
    public frete: number = 0,
  ) {}
}