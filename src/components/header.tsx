import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";

const Header = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 bg-white">
        <Link href="/">SnipCode</Link>

        <div className="flex items-center">
          <button
            className="btn-text-secondary"
            onClick={() => {
              router.push("/search");
            }}
          >
            <AiOutlineSearch size={24} />
          </button>
          <button
            className="btn-text-secondary ml-3"
            onClick={() => {
              router.push("/notify");
            }}
          >
            <AiOutlineBell size={24} />
          </button>

          <button className="btn-primary ml-3 px-3 py-1">ポスト</button>
        </div>
      </nav>
    </>
  );
};

export default Header;
