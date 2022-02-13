import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Textarea from "react-textarea-autosize";
import { SigninProtect } from "@/contexts/auth";
import { createPost } from "@/utils/api";
import { langList } from "@/lib/shiki";
import { CreatePostRequest } from "@/types/request";

const New = (): JSX.Element => {
  useEffect(() => {
    document.body.classList.add("bg-gray-100");
  });

  const router = useRouter();

  const [input, setInput] = useState<CreatePostRequest>({
    title: "",
    language: langList[0],
    code: "",
  });

  const post = () => {
    createPost(input).then((res) => {
      router.replace(`/${res.userId}/${res.id}`);
    });
  };

  return (
    <>
      <SigninProtect>
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
              <button className="btn-text-secondary px-3 py-1">
                下書き保存
              </button>
              <button className="btn-primary ml-3 px-3 py-1" onClick={post}>
                投稿
              </button>
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
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
              />
            </div>

            <div className="border-t my-6" />

            <div>
              <div className="mb-1 text-lg font-bold ">## Snippet</div>
              <div className="flex">
                <span className="mt-1">```</span>
                <select
                  className="pl-1 ml-1 rounded focus:outline-none bg-gray-100"
                  value={input.language}
                  onChange={(e) =>
                    setInput({ ...input, language: e.target.value })
                  }
                >
                  {langList.map((lang, index) => (
                    <option key={index}>{lang}</option>
                  ))}
                </select>
              </div>
              <Textarea
                className="resize-none focus:outline-none overflow-hidden w-full mt-2 p-2 rounded bg-gray-100"
                placeholder="コードを入力"
                value={input.code}
                onChange={(e) => setInput({ ...input, code: e.target.value })}
              />
              <div>```</div>
            </div>

            <div className="mt-4">
              <div className="mb-1 text-lg font-bold">## Description</div>
              <Textarea
                className="resize-none focus:outline-none overflow-hidden w-full p-2 rounded bg-gray-100"
                placeholder="説明を入力"
                value={input.description}
                onChange={(e) =>
                  setInput({ ...input, description: e.target.value })
                }
              />
            </div>
          </div>
        </main>
      </SigninProtect>
    </>
  );
};

export default New;
