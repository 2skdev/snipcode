import Link from "next/link";
import { useRouter } from "next/router";

const Footer = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-screen-md mx-auto px-4 py-3">
        <div className="col-span-1 md:col-span-2 place-self-center">
          <Link href="/">SnipCode</Link>
        </div>

        <button
          className="btn-text-secondary text-sm"
          onClick={() => {
            router.push("/about");
          }}
        >
          About
        </button>
        <button
          className="btn-text-secondary text-sm"
          onClick={() => {
            router.push("/terms");
          }}
        >
          利用規約
        </button>
        <button
          className="btn-text-secondary text-sm"
          onClick={() => {
            router.push("/policy");
          }}
        >
          プライバシーポリシー
        </button>
        <button
          className="btn-text-secondary text-sm"
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
