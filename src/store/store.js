import {create} from 'zustand';

const useStore = create((set) => ({
    bookmark: [{
        title: '모든 북마크',
        indexs: []
    }],
    getBoomark: () => bookmark,
    setBookmark: (bookmark) => set(() => ({ bookmark: bookmark })),
    addBookmark: (title, indexs) => set((state) => ({ 메bookmark: [...state.bookmark, { title: title, indexs: indexs }] })),
    deleteBookmarkByIndex: (title, index) => set((state) => ({ 
        bookmark: [
            ...state.bookmark.filter((mark) => mark.title !== title),
            {
                title: title,
                indexs: state.bookmark.filter((mark) => mark.title === title)[0].indexs.filter((idx) => idx !== index)
            }
        ]
    })),
    deleteBookmarkByTitle: (title) => set((state) => ({ bookmark: state.bookmark.filter((bookmark) => bookmark.title !== title) })),
}));

export default useStore;