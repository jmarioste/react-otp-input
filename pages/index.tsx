import type { NextPage } from "next";
import { useState } from "react";
import Modal from "../components/Modal";

const Home: NextPage = () => {
  //add state and a toggle handler
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  return (
    <div className="container">
      <h1 className="text-2xl">Hello world</h1>
      {/* opens the modal */}
      <button className="btn btn-primary" onClick={handleToggle}>
        Hello
      </button>
      <Modal open={open} onClose={handleToggle}>
        <h3 className="font-bold text-lg">
          Congratulations random Internet user!
        </h3>
        <p className="py-4">
          You havve been selected for a chance to get one year of subscription
          to use Wikipedia for free!
        </p>
        <div className="modal-action">
          {/* closes the modal */}
          <button className="btn btn-primary" onClick={handleToggle}>
            Yay!
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
