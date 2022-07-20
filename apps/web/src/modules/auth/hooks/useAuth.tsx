import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react';
import jwt, { Jwt } from 'jsonwebtoken';
import { client } from 'src/common/config';

import { useCookie } from 'src/common/hooks';

enum Role {
  CUSTOMER = 'Customer',
  ADMIN = 'Admin'
}

type User = {
  id: number;
  username: string;
  email: string;
  contact: string;
  role: Role;
  profilePicUrl: string;
  createdAt: string;
  lastUpdatedAt: string;
  password: never;
};

type Token = Jwt & {
  encoded: string;
};
interface AuthContextInterface {
  user: User | null | undefined;
  token: Token | null | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

const useAuthProvider = (): AuthContextInterface => {
  const [cookieToken, setCookieToken] = useCookie<string | null>('token');
  const [token, setToken] = useState<Token | null | undefined>(undefined);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    setToken(() => {
      if (cookieToken) {
        const decodedToken = jwt.decode(cookieToken, { complete: true });
        return decodedToken ? { encoded: cookieToken, ...decodedToken } : null;
      } else {
        return null;
      }
    });
  }, [cookieToken]);

  useEffect(() => {
    if (token) {
      client.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token.encoded}`;
    } else {
      client.defaults.headers.common['Authorization'] = '';
    }
  }, [token]);

  type WhoAmIResponse = {
    user: User;
  };
  useEffect(() => {
    if (token) {
      client.get<WhoAmIResponse>('/auth/whoami').then((res) => {
        const user = res.data.user;
        setUser(user);
      });
    } else {
      setUser(null);
    }
  }, [token]);

  type LoginResponse = {
    token: {
      encoded: string;
      expiresIn: number;
    };
  };

  const login = async (email: string, password: string) => {
    const res = await client.post<LoginResponse>('/auth/login', {
      email,
      password
    });
    const { encoded, expiresIn } = res.data.token;
    setCookieToken(encoded, {
      expires: new Date(expiresIn)
    });
  };

  const logout = async () => {
    setCookieToken(null);
  };

  return { user, token, login, logout };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
