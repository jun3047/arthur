import styled from "styled-components"
import {Header} from "../component/SearchHeader"
import {BookMarkHeader} from "../component/BookMarkHeader"
import {useParams} from "react-router-dom"
import ContentList from "../component/ContentList"
import {DetailPage} from "../component/DetailPage"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {NewBookmarkPage} from "../component/NewBookmarkPage"
import fakeData from '../constants.json';

export const BookMarkDetailPage = () => {

  const {title} = useParams()
  const [detail, setDetail] = useState(undefined)
  const navigation = useNavigate()

  const [newBookmark, setNewBookmark] = useState(false)
  const makeNewBookmark = () => setNewBookmark(true)

  const nowBookmark = fakeData['fakeBookmark'].find((item) => item.title === title)
  const bookmarkContent = fakeData['fakeContent'].filter((item) => nowBookmark.names.includes(item.name))

  return (
    <PageContainer>
      <Header />
      <BookMarkHeader 
        title={title}
        BackBtnHandler={()=>navigation('/bookmark')}
        makeNewBookmark={makeNewBookmark}
      />
      <ContentList content={bookmarkContent} setDetail={setDetail}/>
      {detail && <DetailPage detail={detail} setDetail={setDetail}/>}
      {newBookmark && <NewBookmarkPage setDetail={setNewBookmark}/>}
    </PageContainer>
  )
}

const PageContainer = styled.div`
  height: 100%;
  width: 100vw;
`

const BookmarkList = ({bookmark}) => {
  
    return (
      <BookmarkListContainer>
        {bookmark.map((item, index) => (
          <div>
          <BookmarkItem key={index} src= {item.names[0] + '.jpg'} item={item} />
          <BookMarkText>{item.title}</BookMarkText>
          </div>
        ))}
      </BookmarkListContainer>
    )
}

const BookmarkListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const BookMarkText = styled.div`
  position: relative;
  right: -20px;
  top: -60px;
  color: #000;
  font-size: 20px;
  font-weight: 600;
`

const BookmarkItem = styled.img`
  margin: 0 12.5px 78px 12.5px;
  width: 295px;
  height: 295px;
`