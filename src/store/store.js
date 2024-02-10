import {create} from 'zustand';

const useStore = create((set, get) => ({
    bookmark: [
        {
          title: '모든 북마크',
          indexs: [],
          version: 0 // 초기 버전 번호 추가
        }
    ],
    getBookmark: () => get().bookmark,
    setBookmark: (bookmark) => set(() => {
      
      window.electronAPI.setStore('bookmark', bookmark);
      return bookmark
    }),
    addBookmark: (title, indexs) => set((state) => {

        const newBookmark = {bookmark: [...state.bookmark, { title, indexs, version: 0 }]}
        window.electronAPI.setStore('bookmark', newBookmark);
        return newBookmark
      }
    ),
    deleteBookmarkByIndex: (title, index) => set((state) => {

      const newBookmark = {bookmark: state.bookmark.map((mark) =>
              mark.title === title ? {
                  ...mark,
                  indexs: mark.indexs.filter((idx) => idx !== index),
                  version: mark.version + 1 // 인덱스 변경 시 버전 증가
              } : mark
          )}

      window.electronAPI.setStore('bookmark', newBookmark);

      return newBookmark
    }),    
    deleteBookmarkByTitle: (title) => set((state) => {

      const newBookmark = {bookmark: state.bookmark.filter((bookmark) => bookmark.title !== title).map((mark) => ({
        ...mark,
        version: mark.version + 1 // 삭제 동작에 대한 버전 업데이트는 선택적입니다. 객체 자체를 제거하는 경우 필요 없을 수 있습니다.
      }))}

      window.electronAPI.setStore('bookmark', newBookmark);
      
      return newBookmark
  }),
}));


// 애플리케이션의 최상위 컴포넌트에서 사용할 초기화 함수
async function initializeStore() {
  const loadedBookmark = await window.electronAPI.getStore('bookmark');
  if (loadedBookmark) {
    window.electronAPI.logStore('저장된 게 있어서 가져옴');
    window.electronAPI.logStore(loadedBookmark);
    useStore.getState().setBookmark(loadedBookmark);
  } else {
    // Electron 저장소에 기본 북마크 설정 (선택적)
    const defaultBookmark = [{ title: '모든 북마크', indexs: [], version: 0 }];
    
    window.electronAPI.logStore('저장된 거 없어서 새로 만듬');
    window.electronAPI.logStore(defaultBookmark);
    useStore.getState().setBookmark(defaultBookmark);
    window.electronAPI.setStore('bookmark', defaultBookmark);
  }
}

export default useStore;
export { initializeStore };