import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App.js ', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Redireciona para a página inicial, na URL / ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Redireciona para a página de about, na URL /about ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('Redireciona para a página ao clicar no link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoriteLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('Redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/xablau');
    });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/xablau');
    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundTitle).toBeInTheDocument();

    const notFoundImage = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(notFoundImage).toBeInTheDocument();
  });
});
