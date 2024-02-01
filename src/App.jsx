import { Route, Routes } from 'react-router-dom';
import {MainPage} from './page/MainPage';
import {BookMarkPage} from './page/BookMarkPage';
import {BookMarkDetailPage} from './page/BookMarkDetailPage';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie'; // useCookies import

function App() {

  const [cookies, setCookie] = useCookies(['bookmark']); // useCookies hook

  const fetchData = async () => {    

    if (cookies.bookmark === undefined) {
      setCookie('bookmark', JSON.stringify([
        {
          "title": "모든 북마크",
          "indexs": []
        }
      ]), { path: '/' });
      console.log('없어서 만듬', cookies.bookmark)
    } else {
      console.log(cookies.bookmark);
    }
  };

  useEffect(() => {
      fetchData();
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