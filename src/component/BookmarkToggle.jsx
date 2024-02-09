import styled from "styled-components"
import useStore from '../store/store';

export const BookmarkToggle = ({nowContent, onBookmark}) => {

    const {bookmark} = useStore()

    return (
        <BookmarkToggleContainer>
            <BookmarkToggleText>내 북마크</BookmarkToggleText>
            {
                bookmark.map((item, index) => {

                    return (
                        <BookmarkToggleItem 
                            onBookmark={onBookmark}
                            nowContent={nowContent}
                            key={index}
                            item={item}
                        />
                    )
                })
            }
        </BookmarkToggleContainer>
    )
}

const BookmarkToggleContainer = styled.div`

    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.25);
    border-radius: 7px;

    position: absolute;
    top: 46px;
    right: 0px;

    padding: 7px 13px 16px 13px;

    width: 219px;
    height: 224px;

    display: flex;
    align-items: flex-start;
    flex-direction: column;

    background-color: white;
`

const BookmarkToggleText = styled.div`
    width: 100%;
    text-align: left;
    color: #555;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    font-weight: 700;

    margin-bottom: 6px;
`

const BookmarkToggleItem = ({item, nowContent, onBookmark}) => {

    const {title, indexs} = item;

    return (
        <BookmarkToggleItemContainer>
            {
                indexs.length === 0 ? 
                <BookmarkToggleItemImgEmtpy /> :
                <BookmarkToggleItemImg src={ '/' + indexs[0].toString() + '.png'}/> 
            }
            <BookmarkToggleItemText>{title}</BookmarkToggleItemText>
            <StrengthBox />
            <BookmarkToggleItemPlusBtn 
                onBookmark={onBookmark}
                nowContent={nowContent} 
                title={title} src="/plusicon.svg"/>
        </BookmarkToggleItemContainer>
    )
}

const StrengthBox = styled.div`
    flex: 1;
`

const BookmarkToggleItemContainer = styled.div`

    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 6px 12px 6px 6px;
    border-radius: 21.5px;
    background-color: #fff;

    &:hover {
        background-color: #E1E1E1;
    }
`

const BookmarkToggleItemText = styled.div`
    color: #555;
    font-size: 14px;
    font-weight: 500;
`



const BookmarkToggleItemImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 20px;
    margin-right: 6px;
`

const BookmarkToggleItemImgEmtpy = styled.div`
    background-color: #EFEFEF;
    width: 32px;
    height: 32px;
    border-radius: 20px;
    margin-right: 6px;
`

const BookmarkToggleItemPlusBtnContainer = styled.div`
  width: 18px;
  height: 18px;
  background: url("/plusicon.svg") no-repeat center center;
  background-size: cover;
  
  &:hover {
      cursor: pointer;
      background: url("/plusicon_active.svg") no-repeat center center;
  }
`

const BookmarkToggleItemPlusBtn = ({title, nowContent, onBookmark}) => {

    const {bookmark} = useStore()

    const addBookmark = () => {
        bookmark.
        find(item => item.title === title).indexs.
        push(nowContent.index)

        bookmark.
        find(item => item.title === title).isBookmark = true
        
        onBookmark()
    }

    return (
            <BookmarkToggleItemPlusBtnContainer
                onClick={addBookmark}
                alt="plusicon"
            />
    )
}