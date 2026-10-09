export interface DesignWork {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  pdf?: string;
}

export const designWorks: DesignWork[] = [
  {
    id: 'little girl with a pumpkin head',
    title: 'little girl with a pumpkin head',
    category: 'Desenho manual',
    description: 'Um desenho feito a mão colocado simplesmente para começar a subir minhas artes mesmo aqui.',
    images: ['/img/Design/little-girl-with-a-pumpkin-head.jpeg'],
  },
  {
    id: 'exemple-pdf',
    title: 'Exemplo em PDF',
    category: 'Projeto de exemplo',
    description: 'Projeto de exemplo para testar a visualização de PDFs.',
    images: [],
    pdf: '/img/Design/Exemple-PDF.pdf',
  },
];
