import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '@models/produto';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css'
})
export class ProdutoFormComponent implements OnInit {
  produto: Produto = {
    nome: '',
    marca: '',
    categoria: '',
    preco: 0,
    estoque: 0,
    imagem: 'https://static.thenounproject.com/png/5191452-200.png',
    descricao: ''
  };

  private service = inject(ProdutoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  // Captura o parâmetro id da rota 
  produtoId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    if (this.produtoId) {
      this.service.buscarPorId(this.produtoId).subscribe({
        next: (produto) => {
          this.produto = produto;
          if (!this.produto.imagem) {
            this.produto.imagem = 'https://static.thenounproject.com/png/5191452-200.png';
          }
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Produto não encontrado:', err);
          alert('Produto não encontrado.');
        }
      });
    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (!result) return;

        const img = new Image();
        img.onload = () => {
          const maxDim = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            this.produto.imagem = canvas.toDataURL('image/jpeg', 0.7);
          } else {
            this.produto.imagem = result;
          }
          this.cdr.markForCheck();
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  }

  salvar(): void {
    if (!this.produto.nome || this.produto.nome.trim() === '') {
      alert('Por favor, informe o nome do produto.');
      return;
    }

    this.produto.preco = Number(this.produto.preco) || 0;
    this.produto.estoque = Number(this.produto.estoque) || 0;

    if (this.produto.preco <= 0) {
      alert('Por favor, informe um preço válido.');
      return;
    }

    if (this.produto.estoque < 0) {
      alert('Por favor, informe uma quantidade em estoque válida.');
      return;
    }

    if (this.produtoId) {
    
      this.produto.id = this.produtoId;

      this.service.editar(this.produto).subscribe({
        next: (produto) => {
          this.produto = produto;
          alert('Produto alterado com sucesso!');
          this.router.navigate(['/gerenciar-produtos']);
        },
        error: (err) => {
          console.error('Erro ao alterar o produto:', err);
          alert('Erro ao alterar o produto.');
        }
      });
    } else {
      // Modo de Inclusão: chama incluir() 
      this.service.incluir(this.produto).subscribe({
        next: (produto) => {
          this.produto = produto;
          alert(`Produto ${this.produto.nome} cadastrado com sucesso!`);
          this.router.navigate(['/gerenciar-produtos']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar o produto:', err);
          alert('Erro ao cadastrar o produto.');
        }
      });
    }
  }
}
