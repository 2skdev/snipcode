import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Textarea from "react-textarea-autosize";
import Logo from "@/assets/logo.svg";
import Image from "@/assets/soco-st_12260_paint.svg";

const Register = (): JSX.Element => {
  useEffect(() => {
    document.body.classList.add("bg-gray-100");
  });

  const router = useRouter();
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");

  const signup = () => {
    router.push("/");
  };

  return (
    <>
      <main className="container md:max-w-screen-md mx-auto flex flex-col items-center pt-10">
        <Logo />
        <Image className="mt-10" />

        <div className="mt-5">
          <div className="ml-1 text-gray-500">ユーザー名</div>
          <input
            className="w-96 mt-1 px-4 py-2 rounded border border-transparent focus:border-orange-500 focus:outline-none text-gray-700"
            placeholder="@"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mt-5">
          <div className="ml-1 text-gray-500">自己紹介</div>
          <Textarea
            className="w-96 mt-1 px-4 py-2 rounded border border-transparent focus:border-orange-500 focus:outline-none text-gray-700 resize-none overflow-y-auto"
            placeholder="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button className="btn-primary mt-5 px-3 py-1" onClick={signup}>
          登録する
        </button>
        <button
          className="btn-text-secondary mt-2 px-3 py-1 underline"
          onClick={() => router.back()}
        >
          キャンセル
        </button>
      </main>
    </>
  );
};

export default Register;
