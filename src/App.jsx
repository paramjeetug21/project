import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const sceneId = uuidv4();
    navigate(`/canvas/${sceneId}`);
  }, [navigate]);

  return <h1>Redirecting to canvas...</h1>;
}

export default App;
