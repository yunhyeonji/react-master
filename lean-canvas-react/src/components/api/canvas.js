import { canvases } from './http';

// 목록 불러오기
export function getCanvases(params) {
  return canvases.get('', { params });
}
