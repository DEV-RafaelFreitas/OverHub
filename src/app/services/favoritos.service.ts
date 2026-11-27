import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { Produto } from '../models/produto';

type Id = number | string;

interface Favorito {
  id?: Id;
  produtoId: Id;
}

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private http = inject(HttpClient);
  private urlFavoritos = 'http://localhost:3000/favoritos';
  private urlProdutos = 'http://localhost:3000/produtos';

  private _favoritos = signal<Favorito[]>([]);
  total = computed(() => this._favoritos().length);

  constructor() {
    this.carregar();
  }

  carregar() {
    this.http.get<Favorito[]>(this.urlFavoritos).subscribe({
      next: (lista) => this._favoritos.set(lista),
      error: () => this._favoritos.set([]),
    });
  }

  ehFavorito(produtoId?: Id): boolean {
    if (produtoId === undefined) return false;
    return this._favoritos().some((f) => String(f.produtoId) === String(produtoId));
  }

  alternar(produtoId?: Id) {
    if (produtoId === undefined) return;

    const existente = this._favoritos().find((f) => String(f.produtoId) === String(produtoId));

    if (existente) {
      this.http.delete(`${this.urlFavoritos}/${existente.id}`).subscribe(() => {
        this._favoritos.update((l) => l.filter((f) => f.id !== existente.id));
      });
    } else {
      this.http.post<Favorito>(this.urlFavoritos, { produtoId }).subscribe((novo) => {
        this._favoritos.update((l) => [...l, novo]);
      });
    }
  }

  limpar() {
    const itens = this._favoritos();
    if (itens.length === 0) return;
    forkJoin(itens.map((f) => this.http.delete(`${this.urlFavoritos}/${f.id}`))).subscribe(() =>
      this._favoritos.set([])
    );
  }

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Favorito[]>(this.urlFavoritos).pipe(
      switchMap((favs) =>
        favs.length === 0
          ? of([] as (Produto | null)[])
          : forkJoin(
              favs.map((f) =>
                this.http
                  .get<Produto>(`${this.urlProdutos}/${f.produtoId}`)
                  .pipe(catchError(() => of(null)))
              )
            )
      ),
      map((lista) => lista.filter((p): p is Produto => p !== null))
    );
  }
}
