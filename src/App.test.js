import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';  // 라우터 추가
import App from './App';

test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
