import { useEffect, useState } from "react";
import Prism from "prismjs";
import { AiOutlineHeart, AiFillHeart, AiOutlineTwitter } from "react-icons/ai";
import {
  MdOutlineEditNote,
  MdUpdate,
  MdOutlineBookmarkAdd,
  MdBookmarkAdded,
  MdContentCopy,
} from "react-icons/md";
import Default from "@/layouts/default";

const Post = (): JSX.Element => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
    setMounted(true);
  });

  const copy = () => {
    // todo: execute copy
  };

  return (
    <>
      <Default>
        <div className="py-8 flex flex-col items-center">
          <div className="font-bold text-3xl text-gray-600">title</div>

          <div className="flex items-center justify-center">
            <button className="btn-secondary px-1 text-sm">python</button>
            <MdOutlineEditNote className="ml-3 text-gray-400" />
            <div className="ml-1 text-xs text-gray-400">2021.01.21</div>
            <MdUpdate className="ml-1 text-gray-400" />
            <div className="ml-1 text-xs text-gray-400">2021.01.21</div>
          </div>

          <div className="flex w-full mt-4">
            <div className="hidden sm:block">
              <div className="mr-2 flex flex-col sticky top-10">
                <button className="text-gray-400 hover:text-gray-500">
                  <AiOutlineHeart size={24} />
                </button>
                <button className="text-gray-400 hover:text-gray-500 mt-2">
                  <MdOutlineBookmarkAdd size={24} />
                </button>
                <button
                  className="text-gray-400 hover:text-gray-500 mt-2"
                  onClick={copy}
                >
                  <MdContentCopy size={24} />
                </button>
                <button className="text-gray-400 hover:text-gray-500 mt-2">
                  <AiOutlineTwitter size={24} />
                </button>
              </div>
            </div>

            <div className="grow mx-2 rounded p-6 bg-white">
              <div className="border-b border-gray-300 font-bold text-lg text-gray-700">
                Snippet
              </div>
              <div onClick={copy}>
                {mounted && (
                  <pre className="rounded">
                    <code className="language-css">{"p { margin: 1px };"}</code>
                  </pre>
                )}
              </div>

              <div className="mt-6 border-b border-gray-300 font-bold text-lg text-gray-700">
                Description
              </div>
              <div className="mt-2 text-gray-700">hogehoge</div>
            </div>
          </div>
        </div>
      </Default>
    </>
  );
};

export default Post;
