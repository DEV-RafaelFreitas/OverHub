import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface LinkRodape {
  rotulo: string;
  rota: string;
}

interface ColunaRodape {
  titulo: string;
  links: LinkRodape[];
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  // As rotas abaixo são placeholders: ajuste quando as páginas existirem
  protected readonly colunas: ColunaRodape[] = [
    {
      titulo: 'Institucional',
      links: [
        { rotulo: 'Sobre nós', rota: '/sobre-nos' },
        { rotulo: 'Nossa História', rota: '/nossa-historia' },
        { rotulo: 'Trabalhe Conosco', rota: '/trabalhe-conosco' },
      ],
    },
    {
      titulo: 'Ajuda',
      links: [
        { rotulo: 'Central de Ajuda', rota: '/central-de-ajuda' },
        { rotulo: 'Trocas e Devoluções', rota: '/trocas-e-devolucoes' },
        { rotulo: 'Garantia', rota: '/garantia' },
      ],
    },
    {
      titulo: 'Categorias',
      links: [
        { rotulo: 'Smartphones', rota: '/produtos/smartphones' },
        { rotulo: 'Notebooks', rota: '/produtos/notebooks' },
        { rotulo: 'Hardware', rota: '/produtos/hardware' },
      ],
    },
    {
      titulo: 'Contato',
      links: [
        { rotulo: 'Fale Conosco', rota: '/fale-conosco' },
        { rotulo: 'WhatsApp', rota: '/whatsapp' },
        { rotulo: 'Email', rota: '/email' },
      ],
    },
  ];

  protected readonly anoAtual = new Date().getFullYear();
}