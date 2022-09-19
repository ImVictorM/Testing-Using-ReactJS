import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokedex.js ', () => {
  const firstTwo = pokemons.slice(0, 2);
  const isFavorite = {
    25: false,
    4: false,
  };
  const getByType = 'pokemon-type';
  const getByName = 'pokemon-name';
  const getByWeight = 'pokemon-weight';
  it('Teste se a página contém um  h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ firstTwo }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const title = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });

  it('É exibido o próximo pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ firstTwo }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const pokemonName = screen.getByTestId(getByName);
    const pokemonType = screen.getByTestId(getByType);
    const pokemonWeight = screen.getByTestId(getByWeight);

    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(nextButton).toBeInTheDocument();
    act(() => {
      userEvent.click(nextButton);
    });

    expect(pokemonName).toHaveTextContent(/charmander/i);
    expect(pokemonType).toHaveTextContent(/fire/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 8.5 kg/i);

    act(() => {
      userEvent.click(nextButton);
    });

    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
  });

  it('Mostra apenas um pokemon por vez', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ firstTwo }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    const pokemonName = screen.getByTestId(getByName);
    const pokemonType = screen.getByTestId(getByType);
    const pokemonWeight = screen.getByTestId(getByWeight);

    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);

    act(() => {
      userEvent.click(nextButton);
    });

    expect(pokemonName).not.toHaveTextContent(/pikachu/i);
    expect(pokemonType).not.toHaveTextContent(/electric/i);
    expect(pokemonWeight).not.toHaveTextContent(/Average weight: 6.0 kg/i);

    expect(pokemonName).toHaveTextContent(/charmander/i);
    expect(pokemonType).toHaveTextContent(/fire/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 8.5 kg/i);
  });

  it('Botões de filtragem possuem o datatestid certo, exceto o All', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ firstTwo }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const filterAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(filterAll).toBeInTheDocument();

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons).toHaveLength(2);
    expect(filterButtons[0]).toHaveTextContent(/electric/i);
    expect(filterButtons[1]).toHaveTextContent(/fire/i);

    act(() => {
      userEvent.click(filterButtons[0]);
    });
    expect(screen.getByTestId(getByType)).toHaveTextContent(/electric/i);

    act(() => {
      userEvent.click(filterButtons[1]);
    });
    expect(screen.getByTestId(getByType)).toHaveTextContent(/fire/i);
  });

  it('É possível clicar no botão de filtragem All', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ firstTwo }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeInTheDocument();
    act(() => {
      userEvent.click(allButton);
    });
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    act(() => {
      userEvent.click(nextButton);
    });
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });
});
