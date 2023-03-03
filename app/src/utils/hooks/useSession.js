import { useUserContext } from '../context/user';
import { useContext } from 'react';

export default function useSession() {
  const { user, setUser, error, loading, updateUser } = useUserContext();
  return { user, setUser, error, loading, updateUser };
}
