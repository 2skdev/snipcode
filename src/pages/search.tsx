import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineSearch, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdBookmarkAdded, MdOutlineBookmarkAdd } from "react-icons/md";
import Default from "@/layouts/default";
import Code from "@/components/code";

const Card = (): JSX.Element => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  return (
    <>
      <div
        className="flex flex-col items-start p-4 hover:cursor-pointer bg-white hover:bg-gray-50"
        onClick={() => {
          router.push("/hoge/hogehoge");
        }}
      >
        <div
          className="font-bold text-2xl text-gray-700"
          onMouseEnter={() => {
            setShow(true);
          }}
          onMouseLeave={() => {
            setShow(false);
          }}
          onMouseMove={(e) => {
            setPosition({ x: e.clientX, y: e.clientY });
          }}
        >
          title
        </div>

        <div className="flex items-center">
          <button
            className="btn-text-secondary underline text-sm"
            onClick={(e) => {
              router.push("/hoge");
              e.stopPropagation();
            }}
          >
            @hogehoge
          </button>
          <div className="ml-1 text-sm text-gray-500">3日前</div>
        </div>

        <div className="flex items-center mt-2">
          <button
            className="btn-secondary px-1 text-sm"
            onClick={(e) => {
              router.push("/search?lang=piyo");
              e.stopPropagation();
            }}
          >
            Python
          </button>

          <button
            className="flex items-center text-gray-400 hover:text-gray-500 ml-2"
            onClick={(e) => {
              setLike(!like);
              e.stopPropagation();
            }}
          >
            {like ? (
              <AiFillHeart size={20} className="fill-red-400" />
            ) : (
              <AiOutlineHeart size={20} />
            )}
            <div className="text-sm text-gray-400">10</div>
          </button>

          <button
            className="text-gray-400 hover:text-gray-500 ml-2"
            onClick={(e) => {
              setBookmark(!bookmark);
              e.stopPropagation();
            }}
          >
            {bookmark ? (
              <MdBookmarkAdded size={20} className="fill-orange-400" />
            ) : (
              <MdOutlineBookmarkAdd size={20} />
            )}
          </button>
        </div>
      </div>

      {show && (
        <div
          className="pointer-events-none fixed rounded opacity-90 text-white"
          style={{ left: position.x, top: position.y }}
        >
          <Code code={"p { margin: 1px };"} />
        </div>
      )}
    </>
  );
};

const Search = (): JSX.Element => {
  const router = useRouter();

  const [input, setInput] = useState("");

  useEffect(() => {
    if (router.query.q !== undefined) {
      if (!Array.isArray(router.query.q)) {
        setInput(router.query.q);
      }
    }
  }, [router.query.q]);

  const search = () => {
    if (input.length > 0) {
      router.push(`/search?q=${input}`);
    }
  };

  return (
    <>
      <Default>
        <div className="py-8">
          <div className="relative flex items-center px-2">
            <input
              className="z-0 w-full px-6 py-3 rounded-full border shadow focus:outline-none text-gray-700"
              value={input}
              onKeyPress={(e) => {
                if (e.key === "Enter") search();
              }}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="btn-text-secondary absolute right-6"
              onClick={search}
            >
              <AiOutlineSearch size={24} />
            </button>
          </div>

          <div className="mt-2 px-2">
            <div>
              <select className="pl-1 ml-1 text-gray-600 text-sm bg-transparent focus:outline-none">
                <option>すべての言語</option>
                <option>C</option>
                <option>C++</option>
                <option>JavaScript</option>
              </select>
              <select className="pl-1 ml-1 text-gray-600 text-sm bg-transparent focus:outline-none">
                <option>関連順</option>
                <option>更新順</option>
                <option>評価順</option>
              </select>
            </div>
          </div>

          <div className="mt-2">
            <Card />
            <div className="border-t" />
          </div>
        </div>
      </Default>
    </>
  );
};

export default Search;
