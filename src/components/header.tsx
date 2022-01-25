import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import GoogleIcon from "@/assets/google.svg";
import Logo from "@/assets/logo.svg";
import Modal from "@/components/modal";

const Header = (): JSX.Element => {
  const router = useRouter();
  const { status } = useSession();

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 bg-white">
        <button onClick={() => router.push("/")}>
          <Logo />
        </button>

        <div className="flex items-center">
          <button
            className="btn-text-secondary"
            onClick={() => {
              router.push("/search");
            }}
          >
            <AiOutlineSearch size={24} />
          </button>

          {status === "authenticated" ? (
            <>
              <button
                className="btn-text-secondary ml-3"
                onClick={() => {
                  router.push("/notify");
                }}
              >
                <AiOutlineBell size={24} />
              </button>
              <button
                className="btn-primary ml-3 px-3 py-1"
                onClick={() => router.push("/new")}
              >
                ポスト
              </button>
            </>
          ) : (
            <Modal label="ログイン">
              <div className="flex flex-col items-center m-5">
                <Logo />

                <button
                  className="btn-secondary flex items-center p-2 my-5 shadow"
                  onClick={() => signIn("google")}
                >
                  <GoogleIcon />
                  <div className="ml-2">Sign in with Google</div>
                </button>

                <div className="text-gray-500 text-xs">
                  <button className="underline">利用規約</button>、
                  <button className="underline">プライバシーポリシー</button>
                  に同意したうえでログインしてください。
                </div>
              </div>
            </Modal>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
