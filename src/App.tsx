import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";
import Reviews from "./pages/Review/Review";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
      refetchOnMount: false,
    },
  },
});

function App() {

  return (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Reviews />
        </QueryClientProvider>
    </Provider>
  );
}

export default App;
