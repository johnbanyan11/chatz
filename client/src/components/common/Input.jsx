import React from "react";

function Input({ name, state, setState, label = false }) {
  return (
    <div>
      {label && (
        <label className="text-teal-light text-lg px-1" htmlFor={name}>
          {name}
        </label>
      )}
      <div>
        <input
          className="bg-input-background text-start focus:outline-none text-white h-10 rounded-lg px-5 mt-1"
          type="text"
          name={name}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Input;
