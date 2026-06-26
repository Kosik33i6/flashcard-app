// src/App.test.tsx
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { App } from './App.tsx';

test('should increment count when button is clicked', async () => {
  const screen = await render(<App />);

  const button = screen.getByRole('button', { name: /count is 0/i });
  await expect.element(button).toBeInTheDocument();

  await button.click();

  await expect
    .element(screen.getByRole('button', { name: /count is 1/i }))
    .toBeInTheDocument();
});

test('should render Vite and React logos', async () => {
  const screen = await render(<App />);

  await expect.element(screen.getByAltText('Vite logo')).toBeInTheDocument();
  await expect.element(screen.getByAltText('React logo')).toBeInTheDocument();
});

test('should render main heading', async () => {
  const screen = await render(<App />);
  await expect.element(screen.getByText('Vite + React')).toBeInTheDocument();
});
