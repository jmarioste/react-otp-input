import React, { useEffect, useRef, useState } from "react";
import OtpInput from "components/OtpInputPartial";

const OtpForm = () => {
  const [otp, setOtp] = useState("");
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
          console.log(otp);
          setOtp(otp.code);
          alert("submitting form");
        })
        .catch((err) => {
          console.log(err);
          alert(JSON.stringify(err.message));
        });
    }
  }, []);

  return (
    <form
      className="card shadow-md bg-base-200"
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(`Submitted OTP - ${otp} `);
        acRef.current.abort();
      }}
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
        <button className="btn btn-primary mt-2" type="submit">
          Verify OTP
        </button>
      </div>
    </form>
  );
};

export default OtpForm;
