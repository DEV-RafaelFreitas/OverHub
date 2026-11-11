import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from '@shared/components/modal/modal';
import { Produto } from '@models/produto';

@Component({
  imports: [Modal, FormsModule, CommonModule],
  selector: 'modal-editar-produto',
  styleUrl: './modal-editar-produto.css',
  templateUrl: './modal-editar-produto.html',
})
export class ModalEditarProduto implements OnInit {
  produto = input<Produto | null>(null);

  cancel = output<void>();
  update = output<Produto>();

  id?: number | string;
  nome: string = '';
  preco: number | null = null;
  estoque: number | null = null;
  marca: string = 'Overhub';
  categoria: string = 'Hardware';
  descricao: string = '';
  imagem: string = 'https://static.thenounproject.com/png/5191452-200.png';

  ngOnInit(): void {
    const p = this.produto();
    if (p) {
      this.id = p.id;
      this.nome = p.nome;
      this.preco = p.preco;
      this.estoque = p.estoque;
      this.marca = p.marca || 'Overhub';
      this.categoria = p.categoria || 'Hardware';
      this.descricao = p.descricao;
      this.imagem = p.imagem || 'https://static.thenounproject.com/png/5191452-200.png';
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.imagem = e.target.result as string;
        }
      };
      reader.readAsDataURL(target.files[0]);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    if (!this.nome.trim()) {
      alert('Por favor, informe o nome do produto.');
      return;
    }
    if (this.preco === null || this.preco <= 0) {
      alert('Por favor, informe um preço válido.');
      return;
    }
    if (this.estoque === null || this.estoque < 0) {
      alert('Por favor, informe a quantidade em estoque.');
      return;
    }

    const produtoAtualizado: Produto = {
      id: this.id,
      nome: this.nome,
      preco: Number(this.preco),
      estoque: Number(this.estoque),
      marca: this.marca || 'Overhub',
      categoria: this.categoria || 'Hardware',
      descricao: this.descricao,
      imagem: this.imagem
    };

    this.update.emit(produtoAtualizado);
  }
}
