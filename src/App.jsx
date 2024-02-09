import { Route, Routes } from 'react-router-dom';
import {MainPage} from './page/MainPage';
import {BookMarkPage} from './page/BookMarkPage';
import {BookMarkDetailPage} from './page/BookMarkDetailPage';
import { useEffect } from 'react';
import useStore from './store/store';

function App() {

  const { setBookmark } = useStore();

  useEffect(() => {
    window.electronAPI.getStore('bookmark').then((loadedBookmark) => {

      console.log('loadedBookmark', loadedBookmark);

      if (loadedBookmark) {
        setBookmark(loadedBookmark);
      }
    });
  }, []);
  
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/bookmark" element={<BookMarkPage />} />
      <Route path="/bookmark/:title" element={<BookMarkDetailPage />} />
    </Routes>
  );
}

export default App;