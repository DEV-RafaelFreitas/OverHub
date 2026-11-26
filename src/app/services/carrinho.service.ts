import { Injectable, computed, inject, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCarrinho } from '@models/carrinho';
import { Produto } from '@models/produto';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CarrinhoService {
    private AuthService = inject(AuthService);
    private router = inject(Router);

    itens = linkedSignal(() => this.lerCarrinho(this.chaveDoUsuario()));

    quantidadeTotal = computed(() =>
    this.itens().reduce((soma, item) => soma + item.quantidade, 0)
    );

    adicionar(produto: Produto): void {
        if (!this.AuthService.usuario()) {
            alert('Faça login para adicionar produtos ao carrinho.');
            this.router.navigate(['/login']);
            return;
        }

        if (produto.estoque < 1) {
            alert('Produto sem estoque disponível.');
            return;
        }

        const existente = this.itens().find(i => i.produto.id === produto.id);

        if (existente) {
            this.aumentar(existente);
        } else {
            this.salvar(this.itens().concat(new ItemCarrinho(produto, 1)));
        }
    }

    aumentar(item: ItemCarrinho): void {
        if (item.quantidade < item.produto.estoque) {
         item.quantidade++;
         this.salvar(this.itens().slice());
        } else {
          alert('Quantidade máxima em estoque atingida.');
        }
    }

    diminuirOuRemover(item: ItemCarrinho): void {
        if (item.quantidade > 1) {
            item.quantidade--;
            this.salvar(this.itens().slice());
        } else {
          this.salvar(this.itens().filter(i => i !== item));
        }
    }

    limpar(): void {
        this.salvar([]);
    }

    private chaveDoUsuario(): string | null {
        const usuario = this.AuthService.usuario();
        return usuario ? `carrinho-${usuario.id}` : null;
    }

    private salvar(lista: ItemCarrinho[]): void {
        const chave = this.chaveDoUsuario();
        if (!chave) {
            return;
        }

        try {
            localStorage.setItem(chave, JSON.stringify(lista));
        } catch {
            console.error('Não foi possível salvar o carrinho no navegador.');
        }
        this.itens.set(lista);
    }

    private lerCarrinho(chave: string | null): ItemCarrinho[] {
        if (!chave) {
            return [];
        }
        
        try {
            const texto = localStorage.getItem(chave);
            if (!texto) {
                return [];
            }
            const lista = JSON.parse(texto) as ItemCarrinho[];
            return lista.map(i => new ItemCarrinho(i.produto, i.quantidade));
        } catch {
            return [];
        }
    }

}
