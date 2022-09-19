import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App.js ', () => {
  it('Contém titulo com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('Página possui a imagem correta', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
