import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente About.js ', () => {
  it('A página possui um h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('A pagina contem dois parágrafos com texto sobre a pokédex', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing/i,
    );
    expect(p1).toBeInTheDocument();

    const p2 = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );
    expect(p2).toBeInTheDocument();
    const pokedexImg = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
