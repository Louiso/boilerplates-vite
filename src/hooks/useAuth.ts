import AuthService from 'app/extensions/auth';
import AuthContext from 'app/extensions/context';
import { useContext, useLayoutEffect } from 'react';

interface UseAuthProps {
  // eslint-disable-next-line no-unused-vars
  onCompleted: (data: any) => void;
  // eslint-disable-next-line no-unused-vars
  onError: (error: any) => void;
  pause?: boolean;
}

export const useAuth = ({ onCompleted, onError, pause }: UseAuthProps) => {
  const { user, loading, setUser, setLoading } = useContext(AuthContext);

  useLayoutEffect(() => {
    if (!pause) {
      AuthService.authenticate()
        .then((data) => {
          setUser(data.data.user);
          onCompleted(data);
        })
        .catch(onError)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return {
    data: user,
    loading,
  };
};
