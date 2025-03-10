"use client";
import { getCurrentUser } from "@/services/AuthServices";
import { TUser } from "@/types/user";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type TUserProviderValues = {
  user: TUser | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<TUser | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
const UserContext = createContext<TUserProviderValues | undefined>(undefined);
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);
  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  console.log(context);
  if (context === undefined) {
    throw new Error("useUser must be used within set user Provider");
  }
  return context;
};

export default UserProvider;
