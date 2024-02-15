import styled from "styled-components"
import equalizerIcon from "../asset/equalizer.svg"
import {Header} from "../component/SearchHeader"
import {MenuHeader} from "../component/MenuHeader"
import ContentList from "../component/ContentList"
import {DetailPage} from "../component/DetailPage"
import FilterPage from "../component/FilterPage"
import {useEffect, useState} from "react"
import fakeData from '../constants.json';


function shuffleArray(array) {
  if (!Array.isArray(array)) {
      console.error('Invalid input. Please provide an array.');
      return;
  }

  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}


function searchInJsonData(jsonData, searchString) {
  const results = [];

  // 검색 대상인 'detail' 속성을 갖고 있는 항목을 찾음
  for (const item of jsonData) {

    const detail = item.detail;
    
    // '외모 묘사', '성격 묘사', '표정 묘사'에서 검색
    for (const key in detail) {
      for (const des in detail[key]) {
        
        for (const serarhKeyword of searchString.split(' ')) {
          if (detail[key][des].includes(serarhKeyword)) {
            results.push(item);
          }
        }
      }
    }

    // 'tags' 배열에서 검색
    if (item.tags.some(tag => tag.includes(searchString))) {
      results.push(item);
    }
  }

  return results;
}



export const MainPage = () => {
  
  const [detail, setDetail] = useState(undefined)
  const [filter, setFilter] = useState(false)
  const [content, setContent] = useState(fakeData['fakeContent'])

  const handleSearch = (searchTerm) => {
    const searchResults = searchInJsonData(fakeData['fakeContent'], searchTerm);
    setContent(searchResults);
  };

  const filterByTags = (tagList) => {
    const filterContent = fakeData['fakeContent']
      .filter((item) => {
        // 조건 1: tag 하나라도 있으면, 결과에 포함
        return tagList.some(tag => item.tags.includes(tag));
      })
      .sort((a, b) => {
        // 조건 2: tag가 많이 일치하는 항목이 앞에 오도록 정렬
        const countA = tagList.filter(tag => a.tags.includes(tag)).length;
        const countB = tagList.filter(tag => b.tags.includes(tag)).length;
        return countB - countA;
      });
  
    setContent(filterContent);
  };

  //현재 item의 인덱스를 content에서 몇번째인지 찾아서 반환

  const findIndexInContent = (item) => {

    console.log(item.index);
    console.log(content.findIndex((element) => element.index === item.index))


    return content.findIndex((element) => element.index === item.index)
  }

  const nextContent = (detail) => {
    const index = findIndexInContent(detail)
    if(index === content.length - 1) {
      setDetail(content[0])
    } else {
      setDetail(content[index + 1])
    }
  }

  const prevContent = (detail) => {
    const index = findIndexInContent(detail)
    if(index === 0) {
      setDetail(content[content.length - 1])
    } else {
      setDetail(content[index - 1])
    }
  }
  

  return (
    <PageContainer>
      <Header handleSearch={handleSearch}/>
      <MenuHeader />
       <FilterBtn onFilter={()=>setFilter(true)}/>
       {filter && (
        <FilterPage
          offFilter={()=>setFilter(false)}
          filterBtnHandler={(tagList)=>{
              filterByTags(tagList)
              setFilter(false)
            }}
          getFilterN = {(tagList) => {
            const filterContent = fakeData['fakeContent']
              .filter((item) => {
                // 조건 1: tag 하나라도 있으면, 결과에 포함
                return tagList.some(tag => item.tags.includes(tag));
              })
              .sort((a, b) => {
                // 조건 2: tag가 많이 일치하는 항목이 앞에 오도록 정렬
                const countA = tagList.filter(tag => a.tags.includes(tag)).length;
                const countB = tagList.filter(tag => b.tags.includes(tag)).length;
                return countB - countA;
              });
              
            return filterContent.length
          }}
        />)}
      <ContentList content={content} setDetail={setDetail}/>
      {detail && (
        <DetailPage
          detail={detail}
          setDetail={setDetail}
          nextContent={nextContent}
          prevContent={prevContent}
        />)}
    </PageContainer>
  )
}


const PageContainer = styled.div`
  height: calc(100vh - 145px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const FilterBtn = ({onFilter}) => {
  return (
      <FilterContainer onClick={onFilter}>
          <EquilzerIcon />
          <FilterText>필터</FilterText>
      </FilterContainer>
  )
}

const EquilzerIcon = () => {
  return <img src={equalizerIcon} alt="Equalizer Icon" />
}


const FilterText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #5B5B5B;
  margin-left: 6px;
`

const FilterContainer = styled.div`

  z-index: 2;

  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 98.29px;
  border-radius: 19px;
  background-color: #EDEDED;
  display: flex;
  align-items: center;
  margin-right: 27px;
  top: 94px;
  left: 22px;
  right: auto;

  @media (max-width: 768px) {
      right: 22px;
      left: auto;
  }

  &:hover {
        cursor: pointer;
        background-color: #C8C8C8;
  }

  &:active {
    background-color: #000000; /* 눌린 상태일 때의 색상 */

    img {
      filter: brightness(0) invert(1);
    }
    
    div {
      color: #ffffff;
    }
  }
`