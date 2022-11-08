import type { NextPage } from "next";
import { useState } from "react";
import OtpInput from "../components/OtpInputPartial";

const Home: NextPage = () => {
  const [otp, setOtp] = useState("");
  return (
    <div className="container">
      <div className="h-screen grid place-content-center bg-base-100">
        <OtpInput
          value={otp}
          onChange={(val) => {
            setOtp(val);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
