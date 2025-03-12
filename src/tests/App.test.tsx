import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../src/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { searchUsers } from '../../src/services/githubApi';

jest.mock('../../src/services/githubApi');

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe('App Component', () => {
  test('renders the main header with correct text', () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    const headerElement = screen.getByRole('heading', {
      name: /GitHub repositories explorer/i,
    });
    expect(headerElement).toBeInTheDocument();
  });

  test('search functionality fetches and displays users', async () => {
    const dummyUsers = [
      { id: 1, login: "user1", avatar_url: "https://example.com/avatar1.png" },
      { id: 2, login: "user2", avatar_url: "https://example.com/avatar2.png" },
    ];
    (searchUsers as jest.Mock).mockResolvedValue(dummyUsers);

    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText(/e\.g\. facebook/i);
    fireEvent.change(input, { target: { value: 'user' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/user1/i)).toBeInTheDocument();
      expect(screen.getByText(/user2/i)).toBeInTheDocument();
    });
  });

  test('displays error message when search fails', async () => {
    (searchUsers as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText(/e\.g\. facebook/i);
    fireEvent.change(input, { target: { value: 'error' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });
});
