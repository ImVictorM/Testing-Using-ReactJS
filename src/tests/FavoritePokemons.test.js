import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente FavoritePokemons.js ', () => {
  it('É exibido "No favorite pokemon found" quando não existe favorito', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
});
