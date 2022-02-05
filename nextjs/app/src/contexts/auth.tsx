import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getMe } from "@/utils/api";
import Loading from "@/components/loading";

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
  const { pathname } = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      if (user.userId === undefined) {
        getMe()
          .then((user: User) => {
            let userId = user.id;
            setUser({ userId, status: session.status });
          })
          .catch(() => {
            setUser({ userId: undefined, status: session.status });
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
  }, [session.status, pathname]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

const SigninProtect = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { userId, status } = useAuth();
  const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  } else if (status === "unauthenticated") {
    router.replace("/login");
  } else if (status === "authenticated" && userId === undefined) {
    router.replace("/register");
  }

  return <>{children}</>;
};
const UnregisteredProtect = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { userId, status } = useAuth();
  const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  } else if (status === "unauthenticated") {
    router.replace("/login");
  } else if (status === "authenticated" && userId !== undefined) {
    router.replace("/");
  }

  return <>{children}</>;
};

export {
  AuthContext,
  AuthProvider,
  useAuth,
  SigninProtect,
  UnregisteredProtect,
};
