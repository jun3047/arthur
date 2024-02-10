import { create } from 'zustand';

// Zustand 스토어 정의
const useStore = create((set) => ({
  bookmark: [], // 초기 상태를 빈 배열로 설정
  setBookmark: (bookmark) => set({ bookmark }),
  addBookmark: (title, indexs) => set((state) => {
    const newBookmark = [...state.bookmark, { title, indexs, version: 0 }];
    return { bookmark: newBookmark };
  }),
  deleteBookmarkByIndex: (title, index) => set((state) => {
    const newBookmark = state.bookmark.map((mark) =>
      mark.title === title ? {
        ...mark,
        indexs: mark.indexs.filter((idx) => idx !== index),
        version: mark.version + 1
      } : mark
    );
    return { bookmark: newBookmark };
  }),
  deleteBookmarkByTitle: (title) => set((state) => {
    const newBookmark = state.bookmark.filter((bookmark) => bookmark.title !== title);
    return { bookmark: newBookmark };
  }),
}));

// 애플리케이션의 최상위 컴포넌트에서 사용할 초기화 함수
async function initializeStore() {
  const loadedBookmark = await window.electronAPI.getStore('bookmark');
  if (loadedBookmark) {
    useStore.getState().setBookmark(loadedBookmark);
  } else {
    // Electron 저장소에 기본 북마크 설정 (선택적)
    const defaultBookmark = [{ title: '모든 북마크', indexs: [], version: 0 }];
    useStore.getState().setBookmark(defaultBookmark);
    window.electronAPI.setStore('bookmark', defaultBookmark);
  }
}

// 상태 변경 시 Electron 저장소에 자동으로 동기화하기 위한 구독 로직
useStore.subscribe((bookmark) => {
  window.electronAPI.setStore('bookmark', bookmark);
}, (state) => state.bookmark);

export default useStore
export { initializeStore };
