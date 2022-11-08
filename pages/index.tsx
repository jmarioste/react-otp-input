import type { NextPage } from "next";
import OtpForm from "components/OtpForm";

const Home: NextPage = () => {
  return (
    <div className="container">
      <div className="h-screen grid place-content-center bg-base-100">
        <OtpForm />
      </div>
    </div>
  );
};

export default Home;
