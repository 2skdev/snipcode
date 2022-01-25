import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Textarea from "react-textarea-autosize";

const New = (): JSX.Element => {
  useEffect(() => {
    document.body.classList.add("bg-gray-100");
  });

  const router = useRouter();

  return (
    <>
      <header>
        <nav className="flex items-center justify-between px-4 py-3">
          <button
            className="btn-text-secondary"
            onClick={() => {
              router.back();
            }}
          >
            <AiOutlineArrowLeft size={24} />
          </button>

          <div>
            <button className="btn-text-secondary px-3 py-1">下書き保存</button>
            <button className="btn-primary ml-3 px-3 py-1">投稿</button>
          </div>
        </nav>
      </header>

      <main className="container md:max-w-screen-md mx-auto py-8 text-gray-700">
        <div className="bg-white rounded shadow-md p-10">
          <div className="flex items-center">
            <div className="text-2xl font-bold">#</div>
            <input
              className="w-full ml-2 py-2 px-3 rounded focus:outline-none text-2xl font-bold bg-gray-100"
              placeholder="タイトル"
            />
          </div>

          <div className="border-t my-6" />

          <div>
            <div className="mb-1 text-lg font-bold ">## Snippet</div>
            <div className="flex">
              <span className="mt-1">```</span>
              <select className="pl-1 ml-1 rounded focus:outline-none bg-gray-100">
                <option>C</option>
                <option>C++</option>
              </select>
            </div>
            <Textarea
              className="resize-none focus:outline-none overflow-hidden w-full mt-2 p-2 rounded bg-gray-100"
              placeholder="コードを入力"
            />
            <div>```</div>
          </div>

          <div className="mt-4">
            <div className="mb-1 text-lg font-bold">## Description</div>
            <Textarea
              className="resize-none focus:outline-none overflow-hidden w-full p-2 rounded bg-gray-100"
              placeholder="説明を入力"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default New;
