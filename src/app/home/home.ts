import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None // <--- Adicione esta linha!
})
export class Home {
  toggleFavorito(event: MouseEvent): void {
    event.stopPropagation();
    const button = event.currentTarget as HTMLButtonElement;
    button.classList.toggle('ativo');
  }
}