import UserProvider from "@/context/UserContext";
import { ReactNode } from "react";
import StoreProvider from "./storeProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <StoreProvider>{children}</StoreProvider>
    </UserProvider>
  );
};

export default Providers;
