const TOKEN_KEY = 'token';

// 토큰 저장
export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// 토큰 불러오기
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// 토큰 삭제
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
