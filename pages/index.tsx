import type { NextPage } from "next";
import { useState } from "react";
import Modal from "../components/Modal";
import OtpInput from "../components/OtpInput";

const Home: NextPage = () => {
  const [otp, setOtp] = useState("");
  return (
    <div className="container">
      <div className="h-screen grid place-content-center bg-base-100">
        <form
          className="card shadow-md bg-base-200"
          onSubmit={async (e) => {
            e.preventDefault();
          }}
        >
          <div className="card-body items-stretch text-center">
            <div className="my-2">
              <h2 className="text-xl"> One-Time Password</h2>
              <p className="text-sm text-base-content/80">
                {" "}
                Input the code sent at jm****e@gmail.com
              </p>
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
      </div>
    </div>
  );
};

export default Home;
