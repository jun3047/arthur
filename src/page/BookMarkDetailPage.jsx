import styled from "styled-components"
import {Header} from "../component/SearchHeader"
import {BookMarkHeader} from "../component/BookMarkHeader"
import {useParams} from "react-router-dom"
import ContentList from "../component/ContentList"
import {DetailPage} from "../component/DetailPage"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {NewBookmarkPage} from "../component/NewBookmarkPage"
import useStore from '../store/store';
import fakeData from '../constants.json';

export const BookMarkDetailPage = () => {

  const {title} = useParams()
  const [detail, setDetail] = useState(undefined)
  const navigation = useNavigate()

  const [newBookmark, setNewBookmark] = useState(false)
  const makeNewBookmark = () => setNewBookmark(true)

  const { bookmark } = useStore();

  const nowBookmark = bookmark.find((item) => item.title === title)
  const bookmarkContent = fakeData['fakeContent'].filter((item) => nowBookmark.indexs.includes(item.index))

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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`