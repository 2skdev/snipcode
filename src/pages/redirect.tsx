import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/auth";
import { getQueryAsString } from "@/utils/query";
import { AiOutlineLoading } from "react-icons/ai";

const Authenticated = (): JSX.Element => {
  const router = useRouter();
  const { userId, status } = useContext(AuthContext);

  useEffect(() => {
    if (status === "authenticated") {
      if (userId !== undefined) {
        router.replace(
          router.query.to ? getQueryAsString(router.query.to) : "/"
        );
      } else {
        router.replace("/register");
      }
    } else if (status === "unauthenticated") {
      router.replace(router.query.to ? getQueryAsString(router.query.to) : "/");
    }
  }, [status]);

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <AiOutlineLoading className="animate-spin text-orange-500" size={24} />
      </div>
    </>
  );
};

export default Authenticated;
