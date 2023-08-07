//@ts-check
import { toast } from "react-toastify";
import { QueryClient } from "react-query";

function queryErrorHandler(error) {
  // error is type any because in js, anything can be an error
  if(error.response){
    if('detail' in error?.response) {
      toast.error(error?.response?.detail);
    }else{
      const message = error instanceof Error ? error.message: "Error connecting to server!"
      toast.error(message,{
        toastId:'queryError'
      });
    }
  }else{
    toast.error(error.message);
  }
}


export function generateQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        onError: queryErrorHandler,
        // staleTime: 360000, // Stale time 1hr added as we dont often updated blogs.
        cacheTime: 43200000, // CacheTime is 12 hours;
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        onError: queryErrorHandler,
      },
    },
  });
}

export const queryClient = generateQueryClient();
