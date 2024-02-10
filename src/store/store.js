import {create} from 'zustand';

const useStore = create((set, get) => ({
    bookmark: undefined,
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


useStore.subscribe(async (state) => {
    
    if (state.bookmark !== undefined){
      window.electronAPI.setStore('bookmark', state.bookmark);
    }

    const myBookmark = await window.electronAPI.getStore('bookmark')

    if (myBookmark !== undefined){
      state.setBookmark(myBookmark);
    } else {
      state.setBookmark({bookmark: [
        {
          title: '모든 북마크',
          indexs: [],
          version: 0 // 초기 버전 번호 추가
        }
      ]});
    }

  }, state => state.bookmark); // bookmark 상태에 대한 변경만 감지

export default useStore;