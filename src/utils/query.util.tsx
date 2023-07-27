import { ReactNode, useMemo } from 'react';

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery as useReactQuery,
} from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { dateUtil } from './date.util';

/**
 * Note: Bug with @tanstack/query-sync-storage-persister, when user exits the applicateion, it saved the query data to localstorage and restore it when the application restarts. But on restore it replaces all local cacheTime and staleTime with global cacheTime and staleTime.
 * To overcome this, we have set global cache and stale time to Infinity and created custom useQuery to handle cache and stale state.
 * So never change this value. To update default QueryCacheTime, update defaultQueryCacheTime property.
 */
const reactQueryCacheTime = Infinity;
const defaultQueryCacheTime = 0;

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
  const query = useReactQuery(queryKey, queryFn, options);

  useMemo(() => {
    if (query.isStale) {
      query.refetch();
      return;
    }

    const cacheTime = options?.cacheTime ?? defaultQueryCacheTime;
    if (cacheTime !== Infinity) {
      if (cacheTime === 0) {
        queryClient.removeQueries(queryKey);
        return;
      }

      const cache = queryClient.getQueryCache();
      const query = cache.get(JSON.stringify(queryKey));

      if (query?.state.dataUpdatedAt) {
        const updatedAtDate = new Date(query?.state.dataUpdatedAt);
        const expiryTime = updatedAtDate.setMilliseconds(cacheTime);

        if (dateUtil.isExpired(expiryTime)) {
          queryClient.removeQueries(queryKey);
        }
      }
    }
  }, []);

  return query;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: reactQueryCacheTime,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: reactQueryCacheTime,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider(props: QueryProviderProps) {
  const { children } = props;
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: reactQueryCacheTime }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
