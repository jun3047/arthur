import {create} from 'zustand';

const useStore = create((set, get) => ({
    bookmark: [{
        title: '모든 북마크',
        indexs: [],
        version: 0 // 초기 버전 번호 추가
    }],
    getBookmark: () => get().bookmark,
    setBookmark: (bookmark) => set(() => ({ bookmark })),
    addBookmark: (title, indexs) => set((state) => ({
        bookmark: [...state.bookmark, { title, indexs, version: 0 }] // 새 북마크 추가 시 초기 버전 설정
    })),
    deleteBookmarkByIndex: (title, index) => set((state) => ({
        bookmark: state.bookmark.map((mark) =>
            mark.title === title ? {
                ...mark,
                indexs: mark.indexs.filter((idx) => idx !== index),
                version: mark.version + 1 // 인덱스 변경 시 버전 증가
            } : mark
        )
    })),    
    deleteBookmarkByTitle: (title) => set((state) => ({
        bookmark: state.bookmark.filter((bookmark) => bookmark.title !== title).map((mark) => ({
            ...mark,
            version: mark.version + 1 // 삭제 동작에 대한 버전 업데이트는 선택적입니다. 객체 자체를 제거하는 경우 필요 없을 수 있습니다.
        }))
    })),
}));

useStore.subscribe((state) => {
    window.electronAPI.setStore('bookmark', state.bookmark);
  }, state => state.bookmark); // bookmark 상태에 대한 변경만 감지

export default useStore;