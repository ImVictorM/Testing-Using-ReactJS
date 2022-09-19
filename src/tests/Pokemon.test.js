import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokemon.js ', () => {
  const firstPokemon = { ...pokemons[0] };
  it('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ firstPokemon }
        isFavorite={ false }
        showDetailsLink={ false }
      />,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa o link de detalhes do pokemon', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ firstPokemon }
        isFavorite={ false }
        showDetailsLink
      />,
    );
    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokemonLink).toBeInTheDocument();

    userEvent.click(pokemonLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um icone de estrela nos pokemons favoritados', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ firstPokemon }
        isFavorite
        showDetailsLink={ false }
      />,
    );
    const favoriteIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
