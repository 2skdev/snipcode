import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { getQueryAsString } from "@/utils/query";
import Loading from "@/components/loading";

const Authenticated = (): JSX.Element => {
  const router = useRouter();
  const { userId, status } = useAuth();

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
      <Loading />
    </>
  );
};

export default Authenticated;
