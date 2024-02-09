import styled from "styled-components"
import {Header} from "../component/SearchHeader"
import {BookMarkHeader} from "../component/BookMarkHeader"
import {NewBookmarkPage} from "../component/NewBookmarkPage"
import {useNavigate} from "react-router-dom"
import {useState} from "react"
import useStore from "../store/store"

export const BookMarkPage = () => {

  const navigation = useNavigate()
  const [newBookmark, setNewBookmark] = useState(false)
  const makeNewBookmark = () => setNewBookmark(true)

  const {bookmark} = useStore();

  return (
    <PageContainer>
      <Header />
      <BookMarkHeader 
        BackBtnHandler={()=>navigation('/')}
        makeNewBookmark={makeNewBookmark}
      />
      {newBookmark && <NewBookmarkPage setDetail={setNewBookmark}/>}
      <BookmarkList bookmark={bookmark} />
    </PageContainer>
  )
}

const PageContainer = styled.div`

  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`

const BookmarkList = ({bookmark}) => {

    const navigation = useNavigate()
  
    return (
      <BookmarkListContainer>
        {
          bookmark.map((item, index) => {

          return (
            <BookmarkItemWrapper>
            {
                item.indexs[0] ? <BookmarkItem
                  onClick={() => {
                    navigation('/bookmark/' + item.title)          
                  }}
                  key={index} 
                  src={'/' + item.indexs[0].toString() + '.png'}
                  item={item}
                />:
                <EntpyBookmarkItem
                  onClick={() => {
                    navigation('/bookmark/' + item.title)        
                  }}
                  key={index} 
                  item={item}
                />
            }
            <BookMarkText>{item.title}</BookMarkText>
            </BookmarkItemWrapper>
            )
          })}
       
      </BookmarkListContainer>
    )
}



const BookmarkListContainer = styled.div`

    margin: 0 auto;
    width: auto;
    padding-left: 30px;
    margin-top: 29px;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 768px) {

    }
`

const BookmarkItemWrapper = styled.div`

    width: 295px;
    margin-right: 30px;
    margin-bottom: 30px;

    @media (max-width: 768px) {

    }

    &:hover {
        cursor: pointer;
    }
`

const BookmarkItem = styled.img`
    width: 295px;
    height: 295px;
    border-radius: 20px;
`

const EntpyBookmarkItem = styled.img`
    width: 295px;
    height: 295px;
    border-radius: 20px;
    background-color: #EFEFEF;
`

const BookMarkText = styled.div`
  right: -20px;
  top: -60px;
  color: #000;
  font-size: 20px;
  font-weight: 600;
`
