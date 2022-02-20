import { useLayoutEffect } from 'react';

import AuthService from './auth';

interface UseAuthProps {
  // eslint-disable-next-line no-unused-vars
  onCompleted: (data: any) => void;
  // eslint-disable-next-line no-unused-vars
  onError: (error: any) => void;
}
export const useAuth = ({ onCompleted, onError }: UseAuthProps) => {
  useLayoutEffect(() => {
    AuthService.authenticate().then(onCompleted).catch(onError);
  }, []);
};
