import { KeyboardEvent, useRef } from "react";

const Textarea = ({
  className,
  placeholder,
  value,
  onChange,
}: {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}): JSX.Element => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const keydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (ref.current !== null) {
      if (e.key === "Tab") {
        e.preventDefault();

        const value = ref.current.value;
        const start = ref.current.selectionStart;
        const end = ref.current.selectionEnd;

        ref.current.value =
          value.substring(0, start) + "\t" + value.substring(end);

        ref.current.selectionStart = ref.current.selectionEnd = start + 1;

        onChange(ref.current.value);
      } else if (e.key === "Enter") {
        const value = ref.current.value;
        const start = ref.current.selectionStart;
        const prev = value.substring(0, start).split("\n");

        if (prev.length > 0) {
          const match = prev[prev.length - 1].match(/^([\t| ]+)/);
          if (match) {
            e.preventDefault();

            ref.current.value =
              value.substring(0, start) +
              "\n" +
              match[1] +
              value?.substring(start);

            ref.current.selectionStart = ref.current.selectionEnd =
              start + match[1].length + 1;

            onChange(ref.current.value);
          }
        }
      }
    }
  };

  return (
    <>
      <textarea
        ref={ref}
        className={"resize-none " + className}
        placeholder={placeholder}
        rows={value.split("\n").length}
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => keydown(e)}
      />
    </>
  );
};

export default Textarea;
