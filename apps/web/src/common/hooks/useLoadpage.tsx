import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react';

interface LoadpageContext {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isTimeout: boolean;
  setIsTimeout: (isTimeout: boolean) => void;
}

export const LoadpageContext = createContext<LoadpageContext>(
  {} as LoadpageContext
);

const useLoadpageProvider = (): LoadpageContext => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);

  return {
    isLoading,
    isTimeout,
    setIsTimeout,
    setIsLoading
  };
};

export const LoadpageProvider = ({ children }: { children: ReactNode }) => {
  const context = useLoadpageProvider();

  return (
    <LoadpageContext.Provider value={context}>
      {children}
    </LoadpageContext.Provider>
  );
};

export const useLoadpage = () => {
  return useContext(LoadpageContext);
};
