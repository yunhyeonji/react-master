import { v4 as uuidv4 } from 'uuid';
import { canvases } from './http';
import dayjs from 'dayjs';

// 목록 불러오기
export function getCanvases(params) {
  const payload = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params,
  );
  return canvases.get('/', { params: payload });
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
