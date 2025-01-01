import { useCallback, useState } from 'react';

function useApiRequest(apiFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (params, { onSuccess, onError }) => {
      try {
        setIsLoading(true);
        setError(null);
        await new Promise(resolver => setTimeout(resolver, 1000));
        const res = await apiFunction(params);
        if (onSuccess) onSuccess(res);
      } catch (err) {
        if (onError) onError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction],
  );

  return {
    isLoading,
    error,
    execute,
  };
}

export default useApiRequest;
