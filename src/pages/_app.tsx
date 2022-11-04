import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import CSR from '../components/CSR';
import '../styles/globals.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <CSR>
      </CSR> */}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
