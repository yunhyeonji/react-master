import { v4 as uuidv4 } from 'uuid';
import { canvases } from './http';
import dayjs from 'dayjs';

// 목록 불러오기
export async function getCanvases(params) {
  const payload = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params,
  );
  const { data } = await canvases.get('/', { params: payload });
  return data;
}

// 데이터 추가
export function createCanvas() {
  const newCanvas = {
    title: uuidv4().substring(0, 4) + '_새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };
  return canvases.post('/', newCanvas);
}

// 데이터 삭제
export async function deleteCanvas(id) {
  await canvases.delete(`/${id}`);
}

// 데이터 상세 불러오기
export async function getCanvasById(id) {
  const { data } = await canvases.get(`/${id}`);
  return data;
}

// 상세 데이터 Title 수정
export async function updateTitle(id, title, value) {
  await canvases.patch(`/${id}`, {
    [title]: value,
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  });
}

// 상세 데이터 전체 수정
export async function updateCanvas(id, canvas) {
  await canvases.put(`/${id}`, canvas);
}
