import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { fetchUser } from "@/lib";

type AuthData = {
  userId: string | undefined;
  status: "authenticated" | "unauthenticated" | "loading" | undefined;
};

const AuthContext = createContext<AuthData>({
  userId: undefined,
  status: undefined,
});

const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<AuthData>({
    userId: undefined,
    status: undefined,
  });
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      if (user.userId === undefined) {
        fetchUser().then(({ status, data }) => {
          let userId = user.userId;
          if (status === 200) {
            userId = data.user.id;
          }
          setUser({ userId, status: session.status });
        });
      } else {
        setUser({ ...user, status: session.status });
      }
    } else if (session.status === "unauthenticated") {
      setUser({
        userId: undefined,
        status: session.status,
      });
    }
  }, [session.status]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
