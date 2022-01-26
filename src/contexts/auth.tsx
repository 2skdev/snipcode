import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { fetchUser } from "@/lib";

type AuthData = {
  userid: String | null;
  login: Boolean;
};

const AuthContext = createContext<AuthData>({ userid: null, login: false });

const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<AuthData>({ userid: "hoge", login: false });
  const session = useSession();

  useEffect(() => {
    if (!user.login && session.status === "authenticated") {
      fetchUser().then(({ ok, me }) => {
        if (ok) {
          setUser({
            userid: me.userid,
            login: true,
          });
        }
      });
    } else if (user.login && session.status === "unauthenticated") {
      setUser({
        userid: null,
        login: false,
      });
    }
  }, [session.status]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
