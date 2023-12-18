import styled from "styled-components"
import equalizerIcon from "../asset/equalizer.svg"
import {Header} from "../component/SearchHeader"
import {MenuHeader} from "../component/MenuHeader"
import ContentList from "../component/ContentList"
import {DetailPage} from "../component/DetailPage"
import FilterPage from "../component/FilterPage"
import {useState} from "react"
import {fakeContent} from "../constants"

export const MainPage = () => {
  
  const [detail, setDetail] = useState(undefined)
  const [filter, setFilter] = useState(false)
  const [content, setContent] = useState(fakeContent)

  const filterByTags = (tagList) => {

    const filterContent = fakeContent.filter((item)=>{
      return tagList.every(tag => item.tags.includes(tag));
    })

    setContent(filterContent)
  }

  return (
    <PageContainer>
      <Header />
      <MenuHeader />
       <FilterBtn onFilter={()=>setFilter(true)}/>
       {filter && (
        <FilterPage 
          offFilter={()=>setFilter(false)}
          filterBtnHandler={(tagList)=>{
              // 결과적용
              filterByTags(tagList)
              console.log('filterBtnHandler');
              setFilter(false)
            }}
        />)}
      <ContentList content={content} setDetail={setDetail}/>
      {detail && <DetailPage detail={detail} setDetail={setDetail}/>}
    </PageContainer>
  )
}


const PageContainer = styled.div`
  height: 100%;
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
`