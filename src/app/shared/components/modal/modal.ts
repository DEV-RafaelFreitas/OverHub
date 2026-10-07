import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-modal',
  styleUrl: './modal.css',
  templateUrl: './modal.html',
})
export class Modal {

  //propriedade configurável
  hasHeaderBorder = input<boolean>(true);
}
