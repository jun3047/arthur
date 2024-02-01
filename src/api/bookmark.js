// 전역 변수 zustand 가져오기

import useStore from '../store/store';
import { useEffect } from 'react';

// 북마크를 추가하는 함수

export const addBookmark = (title, indexs) => {
    const bookmark = useStore.getState().bookmark;
    useStore.setState({ bookmark: [...bookmark, { title: title, indexs: indexs }] });
}

// 북마크를 삭제하는 함수

export const deleteBookmarkByIndex = (title, index) => {
    const bookmark = useStore.getState().bookmark;
    useStore.setState({
        bookmark: [
            ...bookmark.filter((mark) => mark.title !== title),
            {
                title: title,
                indexs: bookmark.filter((mark) => mark.title === title)[0].indexs.filter((idx) => idx !== index)
            }
        ]
    });
}

// 북마크를 삭제하는 함수

export const deleteBookmarkByTitle = (title) => {
    const bookmark = useStore.getState().bookmark;
    useStore.setState({ bookmark: bookmark.filter((bookmark) => bookmark.title !== title) });
}


// 북마크를 가져오는 함수

export const getBookmark = () => {
    return useStore.getState().bookmark;
}


// 북마크를 설정하는 함수

export const setBookmark = (bookmark) => {
    useStore.setState({ bookmark: bookmark });
}


