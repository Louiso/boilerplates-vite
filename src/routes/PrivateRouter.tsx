import Loading from 'components/Loading';
import { useAuth } from 'hooks/useAuth';
import useSaveCredentialAndRedirect from 'hooks/useSaveCredentialAndRedirect';
import { FC, ReactElement } from 'react';
import { matchPath, Navigate } from 'react-router-dom';

interface IProps {
  children: ReactElement;
}

const PrivateRouter: FC<IProps> = ({ children }) => {
  const { redirectToCallback } = useSaveCredentialAndRedirect();

  const authQuery = useAuth({
    onCompleted: () => {
      redirectToCallback();
    },
    onError: () => {},
  });

  if (authQuery.loading) return <Loading />;

  if (
    !authQuery.data &&
    !['/login', '/register'].some((path) => matchPath(path, window.location.pathname))
  )
    return <Navigate to="/login" />;

  return children;
};

export default PrivateRouter;
