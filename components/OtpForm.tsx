import React, { useEffect, useRef, useState } from "react";
import OtpInput from "components/OtpInputPartial";
import classNames from "classnames";

const OtpForm = () => {
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  const acRef = useRef<AbortController>(new AbortController());
  useEffect(() => {
    if ("OTPCredential" in window) {
      const form = ref.current!;
      const ac = acRef.current;
      navigator.credentials
        .get({
          // @ts-ignore
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp: any) => {
          setOtp(otp.code);
          form.submit();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    acRef.current.abort();
    try {
      const response = await fetch(`/api/verify-otp`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ code: otp }),
      });
      type Result = {
        success: boolean;
        message?: string;
      };
      const result: Result = await response.json();
      setSubmitting(false);
      if (result.success) {
        setMessage("You are now verified.");
      } else {
        setMessage(result.message ?? "Invalid code");
        setOtp("");
      }
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (message) {
    return (
      <div className="flex flex-col items-stretch gap-2">
        <p className="text-xl">{message}</p>
        <button
          onClick={() => {
            setMessage("");
            setOtp("");
          }}
          className="btn btn-primary"
        >
          Reset Form
        </button>
      </div>
    );
  }
  return (
    <form
      className="card shadow-md bg-base-200"
      onSubmit={handleSubmit}
      ref={ref}
    >
      <div className="card-body items-stretch text-center">
        <div className="my-2">
          <h2 className="text-xl"> One-Time Password</h2>
          <p className="text-sm text-base-content/80"> Input the code</p>
        </div>
        <OtpInput
          value={otp}
          onChange={(val) => {
            setOtp(val);
          }}
        />
        <button
          className={classNames({
            "btn btn-primary": true,
            loading: submitting,
          })}
          type="submit"
        >
          Verify OTP
        </button>
      </div>
    </form>
  );
};

export default OtpForm;
