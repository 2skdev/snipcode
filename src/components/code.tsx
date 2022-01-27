import { useEffect, useState } from "react";
import Prism from "prismjs";

const Code = ({ code }: { code: string }): JSX.Element => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
    setMounted(true);
  });

  return (
    <>
      {mounted && (
        <pre className="rounded">
          <code className="language-css">{code}</code>
        </pre>
      )}
    </>
  );
};

export default Code;
