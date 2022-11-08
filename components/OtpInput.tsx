import React, { useEffect } from "react";

type InputProps = Pick<
  React.ComponentPropsWithoutRef<"input">,
  "className" | "style"
>;

type Props = {
  value: string;
  onChange(value: string): void;
  // number of inputs
  size?: number;
  // validation regex for each input, digits or alpha numeric
  validationPattern?: RegExp;
} & InputProps;

const OtpInput = ({
  size = 6,
  validationPattern = /[0-9]{1}/,
  value,
  onChange,
  className,
  ...props
}: Props) => {
  const arr = new Array(size).fill("-");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const elem = e.target;
    const val = e.target.value;

    if (!validationPattern.test(val) && val !== "") return;
    const valueArr = value.split("");
    valueArr[index] = val;
    const newVal = valueArr.join("").slice(0, 6);
    onChange(newVal);
    if (val) {
      const next = elem.nextElementSibling as HTMLInputElement | null;
      next?.focus();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const current = e.currentTarget;
    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      const prev = current.previousElementSibling as HTMLInputElement | null;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
      return;
    }

    if (e.key === "ArrowRight") {
      const prev = current.nextSibling as HTMLInputElement | null;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
      return;
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.clipboardData.getData("text").substring(0, size);
    onChange(val);
  };

  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      e.preventDefault();
      const val = e.clipboardData?.getData("text")?.substring(0, size);
      if (val) {
        onChange(val);
      }
    };
    document.addEventListener("paste", handler);
    return () => {
      document.removeEventListener("paste", handler);
    };
  }, []);

  return (
    <div className="flex gap-2">
      {arr.map((item, index) => {
        return (
          <input
            {...props}
            key={index}
            className={
              className ||
              `input input-bordered px-0 
              w-10 h:14 md:w-14 md:h-16 
              text-xl md:text-3xl text-center`
            }
            type="text"
            inputMode="numeric"
            pattern={validationPattern.source}
            autoComplete="otp-password"
            value={value.at(index) ?? ""}
            onChange={(e) => handleInputChange(e, index)}
            onKeyUp={handleKeyUp}
            onPaste={handlePaste}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
