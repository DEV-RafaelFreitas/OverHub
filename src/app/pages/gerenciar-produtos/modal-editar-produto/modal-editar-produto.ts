import { Component, output } from '@angular/core';
import { Modal } from '@shared/components/modal/modal';

@Component({
  imports: [Modal],
  selector: 'modal-editar-produto',
  styleUrl: './modal-editar-produto.css',
  templateUrl: './modal-editar-produto.html',
})
export class ModalEditarProduto {
  
  cancel = output<void>();
  update = output<void>();

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    this.update.emit();
  }
}
