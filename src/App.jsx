import { Route, Routes } from 'react-router-dom';
import {MainPage} from './page/MainPage';
import {BookMarkPage} from './page/BookMarkPage';
import {BookMarkDetailPage} from './page/BookMarkDetailPage';
import { useEffect } from 'react';

function App() {

  const fetchData = async () => {
    try {
      const response = await fetch('/ids.txt'); // public 폴더 내에 있는 파일은 루트 경로에서 접근 가능
      const data = await response.text();
      const parsedIds = data.split('\n').map(id => parseInt(id.trim(), 10));

      let inputNumber = sessionStorage.getItem('orderNumber');

      while (inputNumber === null || inputNumber === '' || inputNumber === undefined){
        inputNumber = prompt("주문번호를 입력해주세요", "");
        if(inputNumber === null || inputNumber === '') {
          alert('주문 번호를 입력해주세요');
        }

        if(!parsedIds.includes(parseInt(inputNumber))) {
          alert('잘못된 주문번호입니다.');
        }

        // 세션으로 저장해서 나중에 다시 안 해도 되게
      }

      sessionStorage.setItem('orderNumber', inputNumber);

    } catch (error) {
      console.error('Error fetching data:', error);
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