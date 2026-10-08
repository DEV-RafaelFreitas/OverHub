import { Component, output } from '@angular/core';
import { Modal } from '@shared/components/modal/modal';

@Component({
  imports: [Modal],
  selector: 'modal-deletar-produto',
  styleUrl: './modal-deletar-produto.css',
  templateUrl: './modal-deletar-produto.html',
})
export class ModalDeletarProduto {
  cancel = output<void>();
  confirm = output<void>();

  onDelete() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
