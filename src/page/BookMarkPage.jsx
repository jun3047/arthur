import styled from "styled-components"
import {Header} from "../component/SearchHeader"
import {BookMarkHeader} from "../component/BookMarkHeader"
import {fakeContent} from "../constants"

const fakeBookmark = [
  {
    title: '기본',
    names: ['예시이미지', '예시이미지'],
  },
  {
    title: '기본',
    names: ['예시이미지', '예시이미지'],
  },
]

export const BookMarkPage = () => {

  return (
    <PageContainer>
      <Header />
      <BookMarkHeader />
      <BookmarkList bookmark={fakeBookmark} />
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