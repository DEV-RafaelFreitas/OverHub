import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';
import { Produto } from '../../models/produto';

type Ordem = 'recentes' | 'menor' | 'maior' | 'nome';

@Component({
  selector: 'app-tela-curtidas',
  standalone: true,
  imports: [],
  templateUrl: './tela-curtidas.html',
  styleUrl: './tela-curtidas.css',
})
export class TelaCurtidas implements OnInit {
  private api = inject(FavoritosService);

  private produtos = signal<Produto[]>([]);
  carregando = signal(true);
  erro = signal('');
  ordem = signal<Ordem>('recentes');

  lista = computed(() => {
    const itens = [...this.produtos()];
    switch (this.ordem()) {
      case 'menor': return itens.sort((a, b) => a.preco - b.preco);
      case 'maior': return itens.sort((a, b) => b.preco - a.preco);
      case 'nome':  return itens.sort((a, b) => a.nome.localeCompare(b.nome));
      default:      return itens;
    }
  });

  ngOnInit() {
    // Busca no db.json os favoritos e, para cada um, o produto completo
    this.api.listarProdutos().subscribe({
      next: (dados) => {
        this.produtos.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os favoritos. O json-server está rodando?');
        this.carregando.set(false);
      },
    });
  }

  mudarOrdem(evento: Event) {
    this.ordem.set((evento.target as HTMLSelectElement).value as Ordem);
  }

  remover(id?: Produto['id']) {
    this.api.alternar(id); // apaga o favorito do db.json
    this.produtos.update((l) => l.filter((p) => String(p.id) !== String(id)));
  }

  limpar() {
    this.api.limpar();
    this.produtos.set([]);
  }

  adicionarAoCarrinho(produto: Produto) {
    // Ligue aqui ao seu CarrinhoService
    console.log('Adicionado ao carrinho:', produto.nome);
  }

  formatar(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  parcela(produto: Produto): string {
    return this.formatar(produto.preco / 10);
  }
}