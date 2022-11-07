import React from "react";

const SignInPage = () => {
  return (
    <div className="h-screen grid place-content-center bg-base-100">
      <form className="card w-96 shadow-md bg-base-200">
        <div className="card-body items-stretch text-center">
          <h2 className="text-xl my-2"> Login via Email</h2>
          <input
            className="input input-bordered"
            type="text"
            inputMode="email"
          />
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
