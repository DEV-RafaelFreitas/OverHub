export interface ItemPedido {
    produtoId: number | string;
    nome: string;
    preco: number;
    quantidade: number;
}

export interface Pedido {

    id?: string;
    usuarioId: number | string;
    itens: ItemPedido[];
    frete: number;
    total: number;
    data: string;

}