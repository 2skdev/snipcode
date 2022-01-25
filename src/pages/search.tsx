import { useRouter } from "next/router";
import Default from "@/layouts/default";
import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";

const Card = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <div
        className="flex flex-col items-start p-4 hover:cursor-pointer bg-white hover:bg-gray-50"
        onClick={() => {
          router.push("/hoge/hogehoge");
        }}
      >
        <div className="font-bold text-2xl text-gray-700">title</div>

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
          <AiOutlineHeart className="ml-1 text-gray-500" />
          <div className="text-sm text-gray-500">10</div>
        </div>
      </div>
    </>
  );
};

const Search = (): JSX.Element => {
  return (
    <>
      <Default>
        <div className="py-8">
          <div className="relative flex items-center px-2">
            <input className="z-0 w-full px-6 py-3 rounded-full border shadow focus:outline-none text-gray-700" />
            <button
              className="btn-text-secondary absolute right-6"
              onClick={() => {}}
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

          <div className="mt-2 divide-y divide-gray-200">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </Default>
    </>
  );
};

export default Search;
