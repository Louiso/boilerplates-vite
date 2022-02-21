import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

const useSaveCredentialAndRedirect = () => {
  const navigate = useNavigate();

  const redirectToCallback = () => {
    const queryParams = queryString.parse(window.location.search) as {
      urlRedirect: string;
      urlCallback: string;
    };
    if (queryParams.urlCallback) {
      window.location.href = queryString.stringifyUrl({
        url: queryParams.urlCallback,
        query: {
          urlRedirect: queryParams.urlRedirect,
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: localStorage.getItem('refreshToken'),
          userId: localStorage.getItem('userId'),
        },
      });
    } else {
      console.log('nagivate to profile');
      navigate('/profile');
    }
  };

  return {
    redirectToCallback,
  };
};

export default useSaveCredentialAndRedirect;
