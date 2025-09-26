import {
  FaTrash,
  FaUndo,
  FaRedo,
  FaFileImage,
  FaRegFile,
} from "react-icons/fa";
import { BsPaintBucket } from "react-icons/bs";

export const CanvasToolbar = ({
  deleteSelected,
  undo,
  redo,
  exportPNG,
  exportSVG,
  selectedColor,
  changeColor,
}) => {
  const ToolButton = ({ icon: Icon, label, onClick, bg = "#679289" }) => (
    <div className="relative group">
      <button
        onClick={onClick}
        className="
          p-3 rounded-full
          transition-all duration-300 ease-in-out
          flex items-center justify-center
        "
        style={{ backgroundColor: bg }}
      >
        <Icon className="text-white text-xl group-hover:scale-110 transition-transform duration-300" />
      </button>

      {label && (
        <span
          className="
            absolute -top-8 left-1/2 -translate-x-1/2
            bg-gray-800 text-white text-xs px-2 py-1 rounded
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
            whitespace-nowrap
          "
        >
          {label}
        </span>
      )}
    </div>
  );

  return (
    <div
      className="
        flex flex-col      
        gap-4               
        items-center        
      "
    >
      <ToolButton
        icon={FaTrash}
        label="Delete"
        onClick={deleteSelected}
        bg="#EE2E31"
      />
      <ToolButton icon={FaUndo} label="Undo" onClick={undo} />
      <ToolButton icon={FaRedo} label="Redo" onClick={redo} />
      <ToolButton
        icon={FaFileImage}
        label="Export PNG"
        onClick={exportPNG}
        bg="#F4C095"
      />
      <ToolButton
        icon={FaRegFile}
        label="Export SVG"
        onClick={exportSVG}
        bg="#F4C095"
      />

      <div className="relative group">
        <div className="relative inline-block">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => changeColor(e.target.value)}
            className="w-10 h-10 rounded-full border-none cursor-pointer appearance-none"
          />
          <BsPaintBucket
            className="
              absolute top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
              pointer-events-none text-yellow-300 text-xl
            "
          />
        </div>
        <span
          className="
            absolute -top-8 left-1/2 -translate-x-1/2
            bg-gray-800 text-white text-xs px-2 py-1 rounded
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
          "
        >
          Color
        </span>
      </div>
    </div>
  );
};
