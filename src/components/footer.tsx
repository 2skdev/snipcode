import { useRouter } from "next/router";
import Logo from "@/assets/logo.svg";

const Footer = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-screen-sm mx-auto py-8">
        <button
          className="col-span-1 md:col-span-2 place-self-center"
          onClick={() => router.push("/")}
        >
          <Logo />
        </button>

        <button
          className="btn-text-secondary text-xs"
          onClick={() => {
            router.push("/about");
          }}
        >
          About
        </button>
        <button
          className="btn-text-secondary text-xs"
          onClick={() => {
            router.push("/terms");
          }}
        >
          利用規約
        </button>
        <button
          className="btn-text-secondary text-xs"
          onClick={() => {
            router.push("/policy");
          }}
        >
          プライバシーポリシー
        </button>
        <button
          className="btn-text-secondary text-xs"
          onClick={() => {
            router.push("/twitter");
          }}
        >
          Twitter
        </button>
      </div>
    </>
  );
};

export default Footer;
