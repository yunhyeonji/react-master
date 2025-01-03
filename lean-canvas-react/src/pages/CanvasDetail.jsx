import { useParams } from 'react-router-dom';
import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
import { useEffect, useState } from 'react';
import {
  getCanvasById,
  updateCanvas,
  updateTitle,
} from '../components/api/canvas';
import Categoryfilter from '../components/Categoryfilter';

function CanvasDetail() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState();

  useEffect(() => {
    const fetchCanvas = async () => {
      const data = await getCanvasById(id);
      setCanvas(data);
    };
    fetchCanvas();
  }, [id]);

  const handlePatchChange = async (title, val) => {
    try {
      await updateTitle(id, title, val);
      setCanvas({ ...canvas, [title]: val });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCanvasChange = async updatedCanvas => {
    try {
      await updateCanvas(id, updatedCanvas);
      setCanvas(updatedCanvas);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <CanvasTitle value={canvas?.title} onChange={handlePatchChange} />
      <div className="flex justify-end pb-4">
        <Categoryfilter
          category={canvas?.category}
          onChange={val => handlePatchChange('category', val)}
        />
      </div>

      {canvas && (
        <LeanCanvas canvas={canvas} onCanvasChange={handleCanvasChange} />
      )}
    </>
  );
}

export default CanvasDetail;
