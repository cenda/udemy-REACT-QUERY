import { Posts } from "./Posts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className="App space-y-6">
        <h1 className="text-3xl font-bold">
          <a href="/" className="underline hover:no-underline">
            Blog &apos;em Ipsum
          </a>
        </h1>
        <Posts />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
