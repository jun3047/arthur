import { Route, Routes } from 'react-router-dom';
import {MainPage} from './page/MainPage';
import {BookMarkPage} from './page/BookMarkPage';
import {BookMarkDetailPage} from './page/BookMarkDetailPage';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie'; // useCookies import

function App() {

  // const [cookies, setCookie] = useCookies('id'); // useCookies hook

  // const fetchBookmarkData = async () => {

  //   if (cookies.id === undefined) {
  //     console.log('id is undefined');
  //   }

  //   console.log(cookies.id);
  // };

  // useEffect(() => {
  //     fetchData();
  // }, []);


  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/bookmark" element={<BookMarkPage />} />
      <Route path="/bookmark/:title" element={<BookMarkDetailPage />} />
    </Routes>
  );
}

export default App;