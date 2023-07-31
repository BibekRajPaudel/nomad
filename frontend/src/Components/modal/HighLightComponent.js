import React, { useState } from "react";

import { AiFillPlusCircle } from "react-icons/ai";
import { FormInput } from "../input/FormInput";

const HighLightComponent = ({ formik, setHighLight }) => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (!input) {
    } else {
      setItems([...items, input]);
      setInput("");
    }
  };

  const addHighlights = () => {
    formik.setFieldValue("highlights", items);
    
  };

  console.log(formik.values.highlights);

  return (
    <>
      <div className="flex items-center gap-5">
        <div className="w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-2 w-full bolder-black px-4 py-2 outline-none rounded-md"
          />
        </div>
        <AiFillPlusCircle
          onClick={addItem}
          className="text-[45px] cursor-pointer"
        />
      </div>
      <div className="mt-5">
        {items.map((item, i) => (
          <div
            className="bg-black flex items-center gap-5 h-full mb-4 text-lg py-1 px-3 rounded-lg overflow-scroll"
            key={i}
          >
            <p className="text-white">{i}</p>
            <p className="text-white">{item}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={addHighlights}
          className="px-10 py-2 border-2 border-black rounded-md"
        >
          Add
        </button>
      </div>
    </>
  );
};

export default HighLightComponent;
