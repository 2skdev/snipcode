import { NextPageContext } from "next";
import { useRouter } from "next/router";
import Default from "@/layouts/default";
import Image from "@/assets/soco-st_11829_paint.svg";

const Error = ({
  statusCode,
  message,
}: {
  statusCode: Number;
  message: String | undefined;
}): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <Default>
        <div className="flex flex-col items-center py-8">
          <div className="font-bold text-6xl text-gray-700">{statusCode}</div>
          {message !== undefined && (
            <div className="mt-2 font-bold text-gray-400">{message}</div>
          )}

          <Image className="my-8" />
          <button
            className="btn-secondary px-3 py-1"
            onClick={() => router.push("/")}
          >
            トップへ戻る
          </button>
        </div>
      </Default>
    </>
  );
};

Error.getInitialProps = async ({
  res,
  err,
}: NextPageContext): Promise<{
  statusCode: Number;
  message: String | undefined;
}> => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  const message =
    statusCode == 404 ? "お探しのページが見つかりませんでした" : undefined;

  return { statusCode, message };
};

export default Error;
