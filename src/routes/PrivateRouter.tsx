import Loading from 'components/Loading';
import { useAuth } from 'hooks/useAuth';
import useSaveCredentialAndRedirect from 'hooks/useSaveCredentialAndRedirect';
import { FC, ReactElement } from 'react';
import { matchPath, useNavigate } from 'react-router-dom';

interface IProps {
  children: ReactElement;
}

const PrivateRouter: FC<IProps> = ({ children }) => {
  const navigation = useNavigate();
  const { redirectToCallback } = useSaveCredentialAndRedirect();

  const authQuery = useAuth({
    onCompleted: () => {
      redirectToCallback();
    },
    onError: () => {
      if (
        !['/login', '/register'].some((path) => matchPath(path, window.location.pathname))
      ) {
        navigation({
          pathname: '/login',
          search: window.location.search,
        });
      }
    },
  });
  if (authQuery.loading) return <Loading />;

  return children;
};

export default PrivateRouter;
