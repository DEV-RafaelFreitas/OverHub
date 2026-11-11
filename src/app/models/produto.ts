export interface Produto {
  id?: number | string;
  nome: string;
  marca?: string;
  descricao: string;
  categoria?: string;
  preco: number;
  estoque: number;
  imagem: string;
}
