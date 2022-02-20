import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Logo from "@/assets/logo.svg";
import Image from "@/assets/soco-st_12260_paint.svg";
import { UnregisteredProtect } from "@/contexts/auth";
import { createMe } from "@/utils/api";
import Textarea from "@/components/textarea";

const Register = (): JSX.Element => {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    document.body.classList.add("bg-gray-100");
  });

  const signup = () => {
    createMe({ id: username, email: mail, bio: bio }).then(() => {
      router.push("/");
    });
  };

  return (
    <>
      <UnregisteredProtect>
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
            <div className="ml-1 text-gray-500">メールアドレス</div>
            <input
              className="w-96 mt-1 px-4 py-2 rounded border border-transparent focus:border-orange-500 focus:outline-none text-gray-700 resize-none overflow-y-auto"
              placeholder="メールアドレスを入力"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <div className="ml-1 text-gray-500">自己紹介</div>
            <Textarea
              className="w-96 mt-1 px-4 py-2 rounded border border-transparent focus:border-orange-500 focus:outline-none text-gray-700 resize-none overflow-y-auto"
              placeholder="自己紹介を入力"
              value={bio}
              onChange={(value) => setBio(value)}
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
      </UnregisteredProtect>
    </>
  );
};

export default Register;
