import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "@/assets/logo.svg";

type TableRow = {
  name: string;
  type: "integer" | "string";
  in: "path" | "query" | "body";
  require: boolean;
  description: JSX.Element;
};

type Content = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  description: string;
  auth: boolean;
  request: TableRow[];
  response: string;
};

const Param = ({ value }: { value: string }): JSX.Element => {
  return (
    <>
      <span className="px-1 rounded bg-gray-100">{value}</span>
    </>
  );
};

const contents: Content[] = [
  {
    method: "GET",
    url: "/api/v1/me",
    description: "ログインユーザを取得する",
    auth: true,
    request: [],
    response: "",
  },
  {
    method: "GET",
    url: "/api/v1/users",
    description: "ユーザを取得する",
    auth: false,
    request: [
      {
        name: "offset",
        type: "integer",
        in: "query",
        require: false,
        description: (
          <>
            Return posts offset
            <br />
            Default is <Param value="0" />
          </>
        ),
      },
      {
        name: "sort",
        type: "string",
        in: "query",
        require: false,
        description: (
          <>
            Return posts sort by <Param value="asc" /> or <Param value="desc" />{" "}
            order
            <br />
            Default is <Param value="asc" />
          </>
        ),
      },
      {
        name: "orderBy",
        type: "string",
        in: "query",
        require: false,
        description: (
          <>
            Return posts order by <Param value="createdAt" /> or{" "}
            <Param value="updatedAt" /> order
            <br />
            Default is <Param value="createdAt" />
          </>
        ),
      },
    ],
    response: "",
  },
  {
    method: "GET",
    url: "/api/v1/users/:userId",
    description: "ユーザを取得する",
    auth: false,
    request: [
      {
        name: "userId",
        type: "integer",
        in: "path",
        require: true,
        description: <>ID of the user</>,
      },
    ],
    response: "",
  },
  {
    method: "GET",
    url: "/api/v1/posts",
    description: "投稿を取得する",
    auth: false,
    request: [
      {
        name: "userId",
        type: "string",
        in: "query",
        require: false,
        description: <>Select post user</>,
      },
      {
        name: "language",
        type: "string",
        in: "query",
        require: false,
        description: <>Select post language</>,
      },
      {
        name: "offset",
        type: "integer",
        in: "query",
        require: false,
        description: (
          <>
            Return posts offset
            <br />
            Default is <Param value="0" />
          </>
        ),
      },
      {
        name: "sort",
        type: "string",
        in: "query",
        require: false,
        description: (
          <>
            Return posts sort by <Param value="asc" /> or <Param value="desc" />{" "}
            order
            <br />
            Default is <Param value="asc" />
          </>
        ),
      },
      {
        name: "orderBy",
        type: "string",
        in: "query",
        require: false,
        description: (
          <>
            Return posts order by <Param value="createdAt" /> or{" "}
            <Param value="updatedAt" /> order
            <br />
            Default is <Param value="createdAt" />
          </>
        ),
      },
    ],
    response: "",
  },
  {
    method: "POST",
    url: "/api/v1/posts",
    description: "新規投稿をする",
    auth: true,
    request: [
      {
        name: "title",
        type: "string",
        in: "body",
        require: true,
        description: <>The title of the post</>,
      },
      {
        name: "language",
        type: "string",
        in: "body",
        require: true,
        description: <>Language of code</>,
      },
      {
        name: "code",
        type: "string",
        in: "body",
        require: true,
        description: <>A code of the post</>,
      },
      {
        name: "description",
        type: "string",
        in: "body",
        require: true,
        description: <>A description of the post</>,
      },
    ],
    response: "",
  },
  {
    method: "GET",
    url: "/api/v1/posts/:postId",
    description: "指定したIDの投稿を取得する",
    auth: false,
    request: [
      {
        name: "postId",
        type: "string",
        in: "path",
        require: true,
        description: <>ID of the post</>,
      },
    ],
    response: "",
  },
  {
    method: "PUT",
    url: "/api/v1/posts/:postId",
    description: "指定したIDの投稿を編集する",
    auth: true,
    request: [
      {
        name: "postId",
        type: "string",
        in: "path",
        require: true,
        description: <>ID of the post</>,
      },
      {
        name: "title",
        type: "string",
        in: "body",
        require: true,
        description: <>The title of the post</>,
      },
      {
        name: "language",
        type: "string",
        in: "body",
        require: true,
        description: <>Language of code</>,
      },
      {
        name: "code",
        type: "string",
        in: "body",
        require: true,
        description: <>A code of the post</>,
      },
      {
        name: "description",
        type: "string",
        in: "body",
        require: true,
        description: <>A description of the post</>,
      },
    ],
    response: "",
  },
  {
    method: "DELETE",
    url: "/api/v1/posts/:postId",
    description: "指定したIDの投稿を削除する",
    auth: true,
    request: [
      {
        name: "postId",
        type: "string",
        in: "path",
        require: true,
        description: <>ID of the post</>,
      },
    ],
    response: "",
  },
  {
    method: "GET",
    url: "/api/v1/bookmark",
    description: "ブックマークを取得する",
    auth: false,
    request: [
      {
        name: "postId",
        type: "string",
        in: "query",
        require: false,
        description: <>ID of the post</>,
      },
      {
        name: "userId",
        type: "string",
        in: "query",
        require: false,
        description: <>Bookmark user</>,
      },
      {
        name: "offset",
        type: "integer",
        in: "query",
        require: false,
        description: (
          <>
            Return bookmarks offset
            <br />
            Default is <Param value="0" />
          </>
        ),
      },
      {
        name: "sort",
        type: "string",
        in: "query",
        require: false,
        description: (
          <>
            Return bookmarks sort by <Param value="asc" /> or{" "}
            <Param value="desc" /> order
            <br />
            Default is <Param value="asc" />
          </>
        ),
      },
      {
        name: "orderBy",
        type: "string",
        in: "query",
        require: false,
        description: (
          <>
            Return bookmarks order by <Param value="createdAt" /> or{" "}
            <Param value="updatedAt" /> order
            <br />
            Default is <Param value="createdAt" />
          </>
        ),
      },
    ],
    response: "",
  },
  {
    method: "POST",
    url: "/api/v1/bookmark/:postId",
    description: "投稿をブックマークする",
    auth: true,
    request: [
      {
        name: "postId",
        type: "string",
        in: "path",
        require: true,
        description: <>ID of the post</>,
      },
    ],
    response: "",
  },
  {
    method: "DELETE",
    url: "/api/v1/bookmark/:postId",
    description: "投稿のブックマークを解除する",
    auth: true,
    request: [
      {
        name: "postId",
        type: "string",
        in: "path",
        require: true,
        description: <>ID of the post</>,
      },
    ],
    response: "",
  },
  {
    method: "GET",
    url: "/api/v1/like",
    description: "いいねを取得する",
    auth: false,
    request: [
      {
        name: "postId",
        type: "string",
        in: "query",
        require: false,
        description: <>ID of the post</>,
      },
      {
        name: "userId",
        type: "string",
        in: "query",
        require: false,
        description: <>Like user</>,
      },
      {
        name: "offset",
        type: "integer",
        in: "query",
        require: false,
        description: (
          <>
            Return likes offset
            <br />
            Default is <Param value="0" />
          </>
        ),
      },
      {
        name: "sort",
        type: "string",
        in: "query",
        require: false,
        description: (
          <>
            Return likes sort by <Param value="asc" /> or <Param value="desc" />{" "}
            order
            <br />
            Default is <Param value="asc" />
          </>
        ),
      },
      {
        name: "orderBy",
        type: "string",
        in: "query",
        require: false,
        description: (
          <>
            Return likes order by <Param value="createdAt" /> or{" "}
            <Param value="updatedAt" /> order
            <br />
            Default is <Param value="createdAt" />
          </>
        ),
      },
    ],
    response: "",
  },
  {
    method: "POST",
    url: "/api/v1/like/:postId",
    description: "投稿をいいねする",
    auth: true,
    request: [
      {
        name: "postId",
        type: "string",
        in: "path",
        require: true,
        description: <>ID of the post</>,
      },
    ],
    response: "",
  },
  {
    method: "DELETE",
    url: "/api/v1/like/:postId",
    description: "投稿のいいねを解除する",
    auth: true,
    request: [
      {
        name: "postId",
        type: "string",
        in: "path",
        require: true,
        description: <>ID of the post</>,
      },
    ],
    response: "",
  },
  {
    method: "GET",
    url: "/api/v1/comment",
    description: "コメントを取得する",
    auth: false,
    request: [
      {
        name: "postId",
        type: "string",
        in: "query",
        require: false,
        description: <>ID of the post</>,
      },
      {
        name: "userId",
        type: "string",
        in: "query",
        require: false,
        description: <>Comment user</>,
      },
      {
        name: "offset",
        type: "integer",
        in: "query",
        require: false,
        description: (
          <>
            Return comment offset
            <br />
            Default is <Param value="0" />
          </>
        ),
      },
      {
        name: "sort",
        type: "string",
        in: "query",
        require: false,
        description: (
          <>
            Return comment sort by <Param value="asc" /> or{" "}
            <Param value="desc" /> order
            <br />
            Default is <Param value="asc" />
          </>
        ),
      },
      {
        name: "orderBy",
        type: "string",
        in: "query",
        require: false,
        description: (
          <>
            Return comment order by <Param value="createdAt" /> or{" "}
            <Param value="updatedAt" /> order
            <br />
            Default is <Param value="createdAt" />
          </>
        ),
      },
    ],
    response: "",
  },
  {
    method: "POST",
    url: "/api/v1/comment/:postId",
    description: "投稿にコメントする",
    auth: true,
    request: [
      {
        name: "postId",
        type: "string",
        in: "path",
        require: true,
        description: <>ID of the post</>,
      },
      {
        name: "comment",
        type: "string",
        in: "body",
        require: true,
        description: <>Content of comment</>,
      },
    ],
    response: "",
  },
  {
    method: "PUT",
    url: "/api/v1/comment/:postId/:commentId",
    description: "投稿のコメントを編集する",
    auth: true,
    request: [
      {
        name: "postId",
        type: "string",
        in: "path",
        require: true,
        description: <>ID of the post</>,
      },
      {
        name: "commentId",
        type: "string",
        in: "path",
        require: true,
        description: <>ID of the comment</>,
      },
      {
        name: "comment",
        type: "string",
        in: "body",
        require: true,
        description: <>Content of comment</>,
      },
    ],
    response: "",
  },
  {
    method: "DELETE",
    url: "/api/v1/comment/:postId/:commentId",
    description: "投稿のコメントを削除する",
    auth: true,
    request: [
      {
        name: "postId",
        type: "string",
        in: "path",
        require: true,
        description: <>ID of the post</>,
      },
      {
        name: "commentId",
        type: "string",
        in: "path",
        require: true,
        description: <>ID of the comment</>,
      },
    ],
    response: "",
  },
];

const Links = ({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}): JSX.Element => {
  return (
    <>
      {contents.map((content, index) => {
        const id = content.method + content.url;
        return (
          <a
            href={`#${id}`}
            className="px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
            key={index}
            onClick={onClick}
          >
            <span className="w-fit px-1 mr-1 rounded text-xs bg-gray-500 text-white">
              {content.method}
            </span>
            {content.url}
          </a>
        );
      })}
    </>
  );
};

const Api = (): JSX.Element => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  return (
    <>
      <header className="md:hidden sticky top-0 left-0 z-10 bg-white">
        <nav className="flex items-center justify-between px-4 h-14">
          <button onClick={() => router.push("/")}>
            <Logo />
          </button>
          <button
            className="px-3 py-2 rounded border text-gray-500 border-gray-500 hover:bg-gray-50 font-bold"
            onClick={() => setShow(!show)}
          >
            {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </button>
        </nav>

        {show && (
          <div className="flex flex-col bg-w border-b">
            <Links onClick={() => setShow(false)} />
          </div>
        )}
      </header>

      <main className="flex relative">
        <nav className="hidden md:flex flex-col overflow-y-scroll overflow-x-hidden h-screen sticky top-0 left-0 bg-gray-100">
          <div className="p-4 bg-gray-700">
            <button onClick={() => router.push("/")}>
              <Logo />
            </button>
            <div className="font-bold text-sm text-white">REST API</div>
          </div>

          <Links />
        </nav>

        <div className="container md:max-w-screen-md mx-auto px-2">
          {contents.map((content, index) => (
            <div
              className="my-4 p-4 rounded border text-gray-700"
              id={content.method + content.url}
              key={index}
            >
              <div className="flex items-center border-b font-bold text-2xl">
                {content.method} {content.url}
                {content.auth && (
                  <span className="w-fit px-1 ml-2 rounded text-sm bg-gray-100 text-red-500">
                    auth
                  </span>
                )}
              </div>

              <div className="mt-2">{content.description}</div>
              <div className="mt-2 font-bold text-lg">Request</div>
              <table className="table-auto min-w-full">
                <thead>
                  <tr className="bg-gray-100 border-b-2 text-left">
                    <th className="px-2 py-1 w-40">name</th>
                    <th className="px-2 py-1 w-20">type</th>
                    <th className="px-2 py-1 w-20">in</th>
                    <th className="px-2 py-1">description</th>
                  </tr>
                </thead>
                <tbody>
                  {content.request.map((row, index) => (
                    <tr className="border-b" key={index}>
                      <td className="px-2 py-1">
                        {row.name}
                        {row.require && (
                          <span className="px-1 ml-1 rounded font-bold text-xs bg-gray-100 text-blue-500">
                            require
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-1">{row.type}</td>
                      <td className="px-2 py-1">{row.in}</td>
                      <td className="px-2 py-1">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-2 font-bold text-lg">Response</div>
              <div className="w-fit px-1 rounded text-sm bg-green-600 text-white">
                STATUS 200
              </div>
              <div className="w-fit px-1 rounded text-sm bg-red-600 text-white">
                STATUS 404
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Api;
