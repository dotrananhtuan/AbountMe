import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio name', () => {
  render(<App />);
  expect(screen.getByText(/VO ANH TUAN/i)).toBeInTheDocument();
});
