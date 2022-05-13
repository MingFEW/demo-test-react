import { useHistory } from 'react-router-dom';

const useRedirect = (): {
  redirectTo(path: string): void;
} => {
  const history = useHistory();

  const redirectTo = (path: string) => {
    return history.push(path);
  };

  return { redirectTo };
};

export default useRedirect;
