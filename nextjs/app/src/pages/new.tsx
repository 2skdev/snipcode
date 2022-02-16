import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";
import Textarea from "react-textarea-autosize";
import { SigninProtect } from "@/contexts/auth";
import { createPost } from "@/utils/api";
import { langList } from "@/lib/shiki";
import { CreatePostRequest } from "@/types/request";

const Select = ({
  className,
  options,
  value,
  onChange,
}: {
  className?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const select = (selected: string) => {
    onChange(selected);
    setOpen(false);
  };

  const list = options.filter((opt) => ~opt.indexOf(search));

  const next = () => {
    const index = list.indexOf(value);
    if (~index) {
      if (index < list.length - 1) {
        onChange(list[index + 1]);
      }
    } else {
      onChange(list[0]);
    }
  };
  const prev = () => {
    const index = list.indexOf(value);
    if (~index) {
      if (index > 0) {
        onChange(list[index - 1]);
      }
    } else {
      onChange(list[0]);
    }
  };

  return (
    <>
      <div className={"flex flex-col " + className}>
        <div className="relative flex items-center w-40">
          <input
            className={
              "z-0 px-2 py-1 w-40 focus:outline-none rounded text-gray-600 bg-gray-100 " +
              (open ? "" : "cursor-pointer")
            }
            ref={input}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && ~list.indexOf(value)) {
                setOpen(false);
                input.current?.blur();
              } else if (e.key === "ArrowDown") {
                next();
              } else if (e.key === "ArrowUp") {
                prev();
              }
            }}
            value={open ? search : value}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            className="absolute right-0 mr-2 text-gray-600 cursor-pointer"
            onMouseDown={() => setOpen(true)}
          >
            {!open && <AiFillCaretDown size={14} />}
          </div>
        </div>

        {open && (
          <div className="absolute flex flex-col w-40 max-h-60 overflow-y-scroll mt-10 border rounded">
            {list.map((opt, index) => (
              <button
                className={[
                  "px-2 py-1 text-left",
                  index == 0
                    ? "rounded-t"
                    : index == list.length - 1
                    ? "rounded-b"
                    : "",
                  opt === value
                    ? "text-white bg-orange-400 hover:bg-orange-300"
                    : "text-gray-600 bg-white hover:bg-gray-100",
                ].join(" ")}
                key={index}
                onMouseDown={() => select(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const New = (): JSX.Element => {
  useEffect(() => {
    document.body.classList.add("bg-gray-100");
  });

  const router = useRouter();

  const [input, setInput] = useState<CreatePostRequest>({
    title: "",
    language: "",
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
              <FiArrowLeft size={20} />
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
                <Select
                  className="pl-1"
                  options={langList}
                  value={input.language}
                  onChange={(value) => setInput({ ...input, language: value })}
                />
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
