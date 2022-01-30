import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import GoogleIcon from "@/assets/google.svg";
import Logo from "@/assets/logo.svg";
import Modal from "@/components/modal";
import { createRef, useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth";

const SearchInput = (): JSX.Element => {
  const router = useRouter();

  const ref = createRef<HTMLInputElement>();
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");

  const style = () => {
    return visible ? "bg-gray-200 w-64 px-4" : "bg-transparent w-0";
  };
  const search = () => {
    if (!visible) {
      setVisible(true);
      ref.current?.focus();
    } else {
      if (input.length > 0) {
        router.push(`/search?q=${input}`);
      } else {
        setVisible(false);
      }
    }
  };

  return (
    <>
      <div className="relative flex items-center mr-1">
        <input
          ref={ref}
          placeholder={"キーワードを入力"}
          className={
            "z-0 transition-all duration-500 py-1 outline-none rounded-full text-gray-700 " +
            style()
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") search();
          }}
          onChange={(e) => setInput(e.target.value)}
          list="lang"
        />
        <button
          className="btn-text-secondary absolute right-2"
          onClick={search}
        >
          <AiOutlineSearch size={18} />
        </button>
      </div>
    </>
  );
};

const Header = (): JSX.Element => {
  const router = useRouter();
  const { userId } = useContext(AuthContext);

  return (
    <>
      <nav className="flex items-center justify-between px-4 h-14 bg-white">
        <button onClick={() => router.push("/")}>
          <Logo />
        </button>

        <div className="flex items-center">
          <SearchInput />

          {userId !== undefined ? (
            <>
              <button
                className="btn-text-secondary mr-3"
                onClick={() => {
                  router.push("/notify");
                }}
              >
                <AiOutlineBell size={18} />
              </button>
              <button
                className="btn-primary px-3 py-1"
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
