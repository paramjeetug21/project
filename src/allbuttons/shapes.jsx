import { LuPen, LuBan } from "react-icons/lu";
import { LuRectangleHorizontal, LuEllipsis, LuCircle } from "react-icons/lu";
import { CiText } from "react-icons/ci";

export const Rectangle = ({ addRect }) => {
  return (
    <button
      className="bg-[#1D7874] hover:bg-[#679289] px-3 py-1 rounded m-1"
      onClick={addRect}
    >
      <LuRectangleHorizontal
        className="text-amber-200 m-1 text-2xl
          transition-transform duration-300 ease-in-out
          hover:scale-125 "
      />
    </button>
  );
};

export const Circle = ({ addCircle }) => {
  return (
    <button
      className="bg-[#1D7874] hover:bg-[#679289] px-3 py-1 rounded m-1 flex items-center "
      onClick={addCircle}
    >
      <LuCircle
        className="text-amber-200 m-1 text-2xl
          transition-transform duration-300 ease-in-out
          hover:scale-125 "
      />
    </button>
  );
};

export const Ellipse = ({ addEllipse }) => {
  return (
    <button
      className="bg-[#1D7874] hover:bg-[#679289] px-3 py-1 rounded m-1"
      onClick={addEllipse}
    >
      <h4
        className="text-amber-200 m-1 text-xl
          transition-transform duration-300 ease-in-out
          hover:scale-125 "
      >
        Ellipse
      </h4>
    </button>
  );
};

export const TextButton = ({ addText }) => {
  return (
    <>
      <button
        className="bg-[#1D7874] hover:bg-[#679289] px-3 py-1 rounded m-1"
        onClick={addText}
      >
        <CiText
          className="text-amber-200 m-1 text-2xl
          transition-transform duration-300 ease-in-out
          hover:scale-125 "
        />
        <label htmlFor="circle"></label>
      </button>
    </>
  );
};

export const PenControls = ({ enablePen, disablePen }) => {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={enablePen}
        className="
          bg-[#F4C095] hover:bg-[#679289]
          p-3 rounded-full
          transition-all duration-300 ease-in-out
          hover:scale-110
          flex items-center justify-center
        "
      >
        <LuPen className="text-2xl text-white" />
      </button>

      <button
        onClick={disablePen}
        className="
          bg-[#F4C095] hover:bg-[#679289]
          p-3 rounded-full
          transition-all duration-300 ease-in-out
          hover:scale-110
          flex items-center justify-center
        "
      >
        <LuBan className="text-2xl text-white" />
      </button>
    </div>
  );
};
