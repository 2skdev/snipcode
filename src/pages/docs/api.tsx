type TableRow = {
  name: String;
  type: "integer" | "string";
  in: "path" | "query" | "body";
  require: Boolean;
  description: JSX.Element;
};

type Content = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: String;
  description: String;
  auth: Boolean;
  request: TableRow[];
  response: String;
};

const Param = ({ value }: { value: String }): JSX.Element => {
  return (
    <>
      <span className="px-1 rounded bg-gray-200">{value}</span>
    </>
  );
};

const contents: Content[] = [
  {
    method: "GET",
    url: "/api/v1/posts",
    description: "投稿を取得する",
    auth: false,
    request: [
      {
        name: "offset",
        type: "integer",
        in: "query",
        require: false,
        description: (
          <>
            Return posts offset. Default is <Param value="0" />
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
            order. Default is <Param value="asc" />
          </>
        ),
      },
      {
        name: "order_by",
        type: "string",
        in: "query",
        require: false,
        description: (
          <>
            Return posts order by <Param value="user_id" /> or{" "}
            <Param value="create_at" />, <Param value="update_at" /> order.
            Default is <Param value="create_at" />
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
        description: <>The title of the post.</>,
      },
      {
        name: "language",
        type: "string",
        in: "body",
        require: true,
        description: <>Language of code.</>,
      },
      {
        name: "code",
        type: "string",
        in: "body",
        require: true,
        description: <>A code of the post.</>,
      },
      {
        name: "description",
        type: "string",
        in: "body",
        require: true,
        description: <>A description of the post.</>,
      },
    ],
    response: "",
  },
  {
    method: "GET",
    url: "/api/v1/posts/:post_id",
    description: "指定したIDの投稿を取得する",
    auth: false,
    request: [
      {
        name: "posd_id",
        type: "integer",
        in: "path",
        require: true,
        description: <>ID of the post.</>,
      },
    ],
    response: "",
  },
  {
    method: "PUT",
    url: "/api/v1/posts/:post_id",
    description: "指定したIDの投稿を編集する",
    auth: true,
    request: [
      {
        name: "posd_id",
        type: "integer",
        in: "path",
        require: true,
        description: <>ID of the post.</>,
      },
      {
        name: "title",
        type: "string",
        in: "body",
        require: true,
        description: <>The title of the post.</>,
      },
      {
        name: "language",
        type: "string",
        in: "body",
        require: true,
        description: <>Language of code.</>,
      },
      {
        name: "code",
        type: "string",
        in: "body",
        require: true,
        description: <>A code of the post.</>,
      },
      {
        name: "description",
        type: "string",
        in: "body",
        require: true,
        description: <>A description of the post.</>,
      },
    ],
    response: "",
  },
  {
    method: "DELETE",
    url: "/api/v1/posts/:post_id",
    description: "指定したIDの投稿を削除する",
    auth: true,
    request: [
      {
        name: "posd_id",
        type: "integer",
        in: "path",
        require: true,
        description: <>ID of the post.</>,
      },
    ],
    response: "",
  },
];

const Api = (): JSX.Element => {
  return (
    <>
      <main className="container md:max-w-screen-md mx-auto">
        <div>REST APIs</div>

        {contents.map((content) => (
          <div className="my-4 p-4 rounded border text-gray-700">
            <div className="flex items-center border-b font-bold text-2xl">
              {content.method} {content.url}
              {content.auth && (
                <span className="w-fit px-1 ml-2 rounded text-sm bg-gray-200 text-red-500">
                  auth
                </span>
              )}
            </div>

            <div className="mt-2">{content.description}</div>
            <div className="mt-2 font-bold text-lg">Request</div>
            <table className="table-auto min-w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 text-left">
                  <th className="px-2 py-1">name</th>
                  <th className="px-2 py-1">type</th>
                  <th className="px-2 py-1">in</th>
                  <th className="px-2 py-1">required</th>
                  <th className="px-2 py-1">description</th>
                </tr>
              </thead>
              <tbody>
                {content.request.map((row) => (
                  <tr className="border-b">
                    <td className="px-2 py-1">{row.name}</td>
                    <td className="px-2 py-1">{row.type}</td>
                    <td className="px-2 py-1">{row.in}</td>
                    <td className="px-2 py-1">{row.require}</td>
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
      </main>
    </>
  );
};

export default Api;
