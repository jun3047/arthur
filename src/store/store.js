import {create} from 'zustand';

const useStore = create((set, get) => ({
    bookmark: [{
        title: '모든 북마크',
        indexs: []
    }],
    getBookmark: () => get().bookmark,
    setBookmark: (bookmark) => set(() => ({ bookmark: bookmark })),
    addBookmark: (title, indexs) => set((state) => ({ bookmark: [...state.bookmark, { title: title, indexs: indexs }] })),
    deleteBookmarkByIndex: (title, index) => set((state) => ({
        bookmark: state.bookmark.map((mark) => mark.title === title ? {
            ...mark,
            indexs: mark.indexs.filter((idx) => idx !== index)
        } : mark)
    })),    
    deleteBookmarkByTitle: (title) => set((state) => ({ bookmark: state.bookmark.filter((bookmark) => bookmark.title !== title) })),
}));

useStore.subscribe((state) => {
    window.electronAPI.setStore('bookmark', state.bookmark);
  }, state => state.bookmark); // bookmark 상태에 대한 변경만 감지  

export default useStore;