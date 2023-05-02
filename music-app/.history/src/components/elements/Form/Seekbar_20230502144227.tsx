import React from "react";

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }: any) => {
  const getTime = (time: any) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className="flex items-center">
      <p className="text-white">{value === 0 ? "0:00" : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="w-[600px] h-1 mx-4 rounded-lg"
      />
      <p className="text-white">{max === 0 ? "0:00" : getTime(max)}</p>
      <div className="space-x-6 ml-4 text-base">
        <button
          type="button"
          onClick={() => setSeekTime(appTime - 5)}
          className="text-white"
        >
          -
        </button>
        <button
          type="button"
          onClick={() => setSeekTime(appTime + 5)}
          className="text-white"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Seekbar;
