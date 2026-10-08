import { Component, output } from '@angular/core';
import { Modal } from '@shared/components/modal/modal';

@Component({
  imports: [Modal],
  selector: 'modal-adicionar-produto',
  styleUrl: './modal-adicionar-produto.css',
  templateUrl: './modal-adicionar-produto.html',
})
export class ModalAdicionarProduto {
  cancel = output<void>();
  add = output<void>();
  
  onAdd() {
    this.add.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
