import { useState } from "react";
import { useRouter } from "next/router";
import { Post as PostType } from "@prisma/client";
import { AiOutlineHeart, AiFillHeart, AiOutlineTwitter } from "react-icons/ai";
import {
  MdOutlineEditNote,
  MdUpdate,
  MdOutlineBookmarkAdd,
  MdBookmarkAdded,
  MdContentCopy,
} from "react-icons/md";
import Default from "@/layouts/default";
import { getPost } from "@/utils/api";
import { getQueryAsString } from "@/utils/query";
import { GetServerSideProps } from "next";
import { getIcon, highlight } from "@/lib/shiki";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query.postId) {
    const res = await getPost(getQueryAsString(context.query.postId));
    const code = await highlight({ code: res.code, lang: res.language });

    return {
      props: {
        post: res,
        code,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

const Post = ({
  post,
  code,
}: {
  post: PostType;
  code: string;
}): JSX.Element => {
  const router = useRouter();

  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const langIcon = getIcon(post?.language);

  const copy = () => {
    // todo: execute copy
  };

  return (
    <>
      <Default>
        <div className="py-8 flex flex-col items-center">
          <div className="font-bold text-3xl text-gray-600">{post?.title}</div>

          <div className="flex items-center justify-center">
            <button className="btn-secondary flex flex-row items-center px-1 text-sm">
              {langIcon !== undefined && <i className={"mr-1 " + langIcon} />}
              {post?.language}
            </button>
            <MdOutlineEditNote className="ml-3 text-gray-400" />
            <div className="ml-1 text-xs text-gray-400">{post?.createdAt}</div>
            <MdUpdate className="ml-1 text-gray-400" />
            <div className="ml-1 text-xs text-gray-400">{post?.updatedAt}</div>
          </div>

          <div className="flex w-full mt-4">
            <div className="hidden sm:block">
              <div className="mr-2 flex flex-col sticky top-10">
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setLike(!like)}
                >
                  {like ? (
                    <AiFillHeart size={24} className="fill-red-400" />
                  ) : (
                    <AiOutlineHeart size={24} />
                  )}
                </button>
                <button
                  className="text-gray-400 hover:text-gray-500 mt-2"
                  onClick={() => setBookmark(!bookmark)}
                >
                  {bookmark ? (
                    <MdBookmarkAdded size={24} className="fill-orange-400" />
                  ) : (
                    <MdOutlineBookmarkAdd size={24} />
                  )}
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
              <div className="mt-2" onClick={copy}>
                <div dangerouslySetInnerHTML={{ __html: code }}></div>
              </div>

              <div className="mt-6 border-b border-gray-300 font-bold text-lg text-gray-700">
                Description
              </div>
              <div className="mt-2 text-gray-700">{post?.description}</div>
            </div>
          </div>
        </div>
      </Default>
    </>
  );
};

export default Post;
