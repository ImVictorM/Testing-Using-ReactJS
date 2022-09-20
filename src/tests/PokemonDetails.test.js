import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../pages/PokemonDetails';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente PokemonDetails.js ', () => {
  const isPokemonFavoriteById = {
    25: false,
  };
  const pikachu = [pokemons[0]];
  const match = { params: { id: '25' } };

  it('As informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ match }
        pokemons={ pikachu }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const detailsTitle = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(detailsTitle).toBeInTheDocument();

    const detailsLink = screen.queryByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();

    const pokemonDetails = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity/i,
    );
    expect(pokemonDetails).toBeInTheDocument();
  });

  it('Existe seção com os mapas contendo as localizações do pokémon:', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ match }
        pokemons={ pikachu }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const locationTitle = screen.getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    expect(locationTitle).toBeInTheDocument();

    const locationImages = screen.getAllByAltText(/pikachu location/i);
    expect(locationImages).toHaveLength(2);
    expect(locationImages[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImages[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();
    expect(screen.getByText(/kanto power plant/i)).toBeInTheDocument();
  });

  it('', () => {
    renderWithRouter(
      <App />,
    );
    const moreDetail = screen.getByRole('link', {
      name: /more details/i,
    });

    act(() => {
      userEvent.click(moreDetail);
    });

    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(favoriteCheckbox).not.toBeChecked();

    act(() => {
      userEvent.click(favoriteCheckbox);
    });
    expect(favoriteCheckbox).toBeChecked();
  });
});
