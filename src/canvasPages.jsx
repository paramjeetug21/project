import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import debounce from "lodash.debounce";
import { fabric } from "fabric";
import { RiShapesFill } from "react-icons/ri";
import {
  Circle,
  Rectangle,
  Ellipse,
  TextButton,
  PenControls,
} from "./allbuttons/shapes";
import { CanvasToolbar } from "./allbuttons/oprations";

function CanvasPage() {
  const { id: sceneId } = useParams();
  const location = useLocation();
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("#1D7874");

  const history = useRef([]);
  const historyIndex = useRef(-1);

  const params = new URLSearchParams(location.search);
  const viewOnly = params.get("viewOnly") === "true";

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: "#FFFFE0",
      width: 900,
      height: 600,
    });
    canvasRef.current = canvas;
    canvas.selection = !viewOnly;

    const sceneRef = doc(db, "scenes", sceneId);
    getDoc(sceneRef).then((docSnap) => {
      if (docSnap.exists()) {
        canvas.loadFromJSON(docSnap.data().data, canvas.renderAll.bind(canvas));
      }
    });

    const saveCanvas = debounce(() => {
      setDoc(sceneRef, {
        data: canvas.toJSON(),
        updatedAt: Date.now(),
      });
    }, 500);

    canvas.on("object:added", saveCanvas);
    canvas.on("object:modified", saveCanvas);
    canvas.on("object:removed", saveCanvas);

    const grid = 20;
    canvas.on("object:moving", (e) => {
      const obj = e.target;
      obj.set({
        left: Math.round(obj.left / grid) * grid,
        top: Math.round(obj.top / grid) * grid,
      });
    });

    const saveHistory = () => {
      const json = canvas.toJSON();
      history.current = history.current.slice(0, historyIndex.current + 1);
      history.current.push(json);
      historyIndex.current += 1;
    };
    canvas.on("object:added", saveHistory);
    canvas.on("object:modified", saveHistory);
    canvas.on("object:removed", saveHistory);

    return () => canvas.dispose();
  }, [sceneId, viewOnly]);

  const addRect = () =>
    canvasRef.current.add(
      new fabric.Rect({
        left: 100,
        top: 100,
        fill: selectedColor,
        width: 80,
        height: 60,
        selectable: !viewOnly,
      })
    );
  const addCircle = () =>
    canvasRef.current.add(
      new fabric.Circle({
        left: 150,
        top: 150,
        fill: selectedColor,
        radius: 40,
        selectable: !viewOnly,
      })
    );
  const addEllipse = () =>
    canvasRef.current.add(
      new fabric.Ellipse({
        left: 200,
        top: 200,
        fill: selectedColor,
        rx: 60,
        ry: 30,
        selectable: !viewOnly,
      })
    );
  const addText = () =>
    canvasRef.current.add(
      new fabric.Textbox("Text", {
        left: 250,
        top: 250,
        fontSize: 20,
        fill: selectedColor,
        selectable: !viewOnly,
      })
    );
  const enablePen = () => {
    if (!viewOnly) {
      const canvas = canvasRef.current;
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = selectedColor;
      canvas.freeDrawingBrush.width = 3;
    }
  };
  const disablePen = () => (canvasRef.current.isDrawingMode = false);
  const deleteSelected = () => {
    if (!viewOnly) {
      const canvas = canvasRef.current;
      const activeObject = canvas.getActiveObject();
      if (activeObject) canvas.remove(activeObject);
    }
  };
  const changeColor = (color) => {
    setSelectedColor(color);
    const canvas = canvasRef.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject && !viewOnly) {
      activeObject.set("fill", color);
      canvas.renderAll();
    }
  };
  const undo = () => {
    if (historyIndex.current <= 0) return;
    historyIndex.current -= 1;
    canvasRef.current.loadFromJSON(
      history.current[historyIndex.current],
      canvasRef.current.renderAll.bind(canvasRef.current)
    );
  };
  const redo = () => {
    if (historyIndex.current >= history.current.length - 1) return;
    historyIndex.current += 1;
    canvasRef.current.loadFromJSON(
      history.current[historyIndex.current],
      canvasRef.current.renderAll.bind(canvasRef.current)
    );
  };
  const exportPNG = () => {
    const dataURL = canvasRef.current.toDataURL({ format: "png", quality: 1 });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas.png";
    link.click();
  };
  const exportSVG = () => {
    const svg = canvasRef.current.toSVG();
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "canvas.svg";
    link.click();
  };
  const shareCanvas = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Canvas link copied! Share this URL to collaborate.");
  };

  return (
    <div className="min-h-screen w-full bg-[#acf9f9] text-white flex flex-col">
      <header className="bg-[#1D7874] shadow-md px-8 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-wide ">
          Canvas ID: <span className="font-mono text-amber-200">{sceneId}</span>
        </h2>
        <button
          onClick={shareCanvas}
          className="bg-[#EE2E31] hover:bg-[#F4C095] text-white px-4 py-2 rounded-lg transition-all"
        >
          Share Link
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-20 bg-[#1D7874] flex flex-col items-center py-6 gap-4 border-r-4 border-[#679289]">
          <RiShapesFill
            className="text-3xl
  hover:rotate-360
  transition-transform
  duration-[2000ms]
  ease-in-out "
          />
          <Rectangle addRect={addRect} />
          <Circle addCircle={addCircle} />
          <Ellipse addEllipse={addEllipse} />
          <TextButton addText={addText} />

          <div className="my-4 w-10 h-[1px] bg-[#679289]" />

          <PenControls enablePen={enablePen} disablePen={disablePen} />
        </aside>

        <main className="flex-1 flex items-center justify-center p-6 bg-[#0d6e7f]">
          <div className="border-4 border-[#679289] rounded-xl shadow-xl bg-[#FFFFE0]">
            <canvas id="canvas" />
          </div>
        </main>

        <aside className="w-28 bg-[#1D7874] flex flex-col items-center py-6 gap-4 border-l-4 border-[#679289]">
          <CanvasToolbar
            deleteSelected={deleteSelected}
            undo={undo}
            redo={redo}
            exportPNG={exportPNG}
            exportSVG={exportSVG}
            selectedColor={selectedColor}
            changeColor={changeColor}
          />
        </aside>
      </div>
    </div>
  );
}

export default CanvasPage;
