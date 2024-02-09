import { Route, Routes } from 'react-router-dom';
import {MainPage} from './page/MainPage';
import {BookMarkPage} from './page/BookMarkPage';
import {BookMarkDetailPage} from './page/BookMarkDetailPage';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie'; // useCookies import

function App() {

  function saveData() {
    window.electronAPI.setStore('unicorn', '🦄');
  }
  
  async function loadData() {
    const value = await window.electronAPI.getStore('unicorn');
    console.log("value:", value); // 🦄
  }

  useEffect(() => {
    console.log("window:", window);
    console.log("window.electronAPI:", window.electronAPI);
    saveData();
    loadData();
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