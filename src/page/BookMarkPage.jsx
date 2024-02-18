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

    console.log("BookmarkList_bookmark:", bookmark)
  
    return (
      <BookmarkListContainer>
        {
          bookmark.map((item, index) => {

          const isFourBookmarks = item.indexs.length > 3

          console.log("item.indexs:", item.indexs)
          console.log("item.indexs[-1]:", item.indexs.at(-1))

          return (
            <BookmarkItemWrapper>
            {
                isFourBookmarks ? <BookmarkFourItem
                  onClick={() => {
                    navigation('/bookmark/' + item.title)
                  }}
                  key={index}
                  item={item}
                /> :
                item.indexs[0] ? <BookmarkItem
                  onClick={() => {
                    navigation('/bookmark/' + item.title)          
                  }}
                  key={index} 
                  src={'/webp/' + item.indexs.at(-1) + '.webp'}
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
    width: calc(325px*3);
    margin-top: 29px;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 980px) {
      width: calc(325px*2);
    }
`

const BookmarkItemWrapper = styled.div`

    position: relative;
    width: 295px;
    margin: 15px;

    @media (max-width: 768px) {

    }

    &:hover {
        cursor: pointer;
    }
`

const BookmarkFourItem = ({onClick, item}) => {

  const imgList = item.indexs.slice(-4);

  console.log("imgList:", imgList)

  return(
    <BookmarkItemContainer>
      {
        imgList.map((itemIndex, idx) => {
          return (
            <BookmarkItemContainerImg
              key={idx}
              src={'/webp/' + itemIndex + '.webp'}
              onClick={onClick}
            />
          )
        })
      }
      <BookmarkItemBar up={true}/>
      <BookmarkItemBar up={false}/>
    </BookmarkItemContainer>
  )
}

const BookmarkItemContainerImg = styled.img`
    width: 100%;
    height: 100%;
`

const BookmarkItemBar = styled.div`

  //props로 받아서 가로 세로 길이를 조절할 수 있게 하기
  width: ${props => props.up ? `100%` : `5px`};
  height: ${props => props.up ? `5px` : `100%`};
  position: absolute;

  ${props => props.up ? `bottom: 50%;` : `right: 50%;`};
  background-color: white;
`

const BookmarkItemContainer = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 295px;
  height: 295px;
  border-radius: 20px;
  overflow: hidden;
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

  position: absolute;
  left: 18px;
  bottom: -30px;
  color: #000;
  font-size: 20px;
  font-weight: 600;
`
