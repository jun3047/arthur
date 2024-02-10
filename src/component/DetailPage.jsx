import styled from "styled-components"
import ContentList, {RelatedContentList} from "./ContentList"
import fakeData from '../constants.json';
import {useEffect, useState} from "react"
import { BookmarkToggle } from "./BookmarkToggle";
import bookmarkIcon from '../asset/bookmark.svg'
import { useRef } from 'react';
import useStore from "../store/store";

export const DetailPage = ({detail, setDetail, nextContent, prevContent}) => {

    const ref = useRef(null)

    const initContent = fakeData['fakeContent'].find((item) => item.index === detail.index)
    const [nowContent, setNowContent] = useState(initContent)

    useEffect(() => {
        ref.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        setNowContent(fakeData['fakeContent'].find((item) => item.index === detail.index))
    }, [detail])

    const close = () => setDetail(undefined)


    return (
        <BackgroundDark>
            <DetailContainer ref={ref}>
                <DetailBox>
                    <DetailHeader nowContent={nowContent} close={close} />
                    <MainContent 
                        nextContent={nextContent}
                        prevContent={prevContent}
                        detail={detail}
                    />
                    <RelatedContent setDetail={setDetail} tags={nowContent['tags']}/>
                </DetailBox>
            </DetailContainer>
        </BackgroundDark>
    )
}
const BackgroundDark = styled.div`
    top: 0px;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background: rgba(75, 77, 88, 0.91);

    position: fixed;
    display: flex;
    overflow: hidden;
    justify-content: center;
    overscroll-behavior: contain;
`


const DetailContainer = styled.div`

    height: 100vh;
    width: 100vw;
    z-index: 3;

    margin: 0 auto;

    background: rgba(75, 77, 88, 0.91);
    
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;

    &::-webkit-scrollbar {
        display: none;
    }
`

const DetailHeader = ({close, nowContent}) => {

    const {bookmark} = useStore()

    const initActive = () => bookmark
        .find((bookmark) => bookmark.indexs.includes(nowContent.index))

    const [active, setActive] = useState(initActive)

    const onBookmark = () => setActive(true)

    return (
        <DetailHeaderContainer>
            <BookmarkMeun
                onBookmark={onBookmark}
                nowContent={nowContent}/>
            <BookmarkBtn active={active} nowContent={nowContent}/>
            <Xbtn
                src="/x.svg"
                onClick={close}
            />
        </DetailHeaderContainer>
    )
}


const BookmarkBtn = ({nowContent, active}) => {

    return (
        <BookmarkBtnContainer 
            active={active}>
            <BookmarkBtnIcon />
        </BookmarkBtnContainer>
    )
}

const BookmarkBtnContainer = styled.div`
    background-color: ${props => props.active ? '#403DDE' : '#555555'};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 20px;
`


const BookmarkBtnIcon = () => {
    return <img src={bookmarkIcon} alt="Bookmark Icon" />
}


const DetailHeaderContainer = styled.div`
    padding-bottom: 15px;
    padding-top: 40px;
    margin: 28px 34px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 41px;
    background-color: white;
`

const BookmarkMeun = ({nowContent, onBookmark}) => {

    const {bookmark} = useStore()

    const initBookmark = bookmark[0]
    const [onBookmarkToggle, setOnBookmarkToggle] = useState(false)

    const bookmarkToggle = () => setOnBookmarkToggle(!onBookmarkToggle)

    return (
        <BookmarkContainer active={onBookmarkToggle} onClick={bookmarkToggle}>
            <BookmarkText>{initBookmark.title}</BookmarkText>
            <BookmarkIcon src="/bookmark_more.png"/>
            {
                onBookmarkToggle &&
                <BookmarkToggle 
                    onBookmark={onBookmark}
                    nowContent={nowContent}
                />
            }
        </BookmarkContainer>
    )
}

const BookmarkContainer = styled.div`

    position: relative;
    
    box-sizing: border-box;
    padding: 0 6px;
    padding-right: 18px;
    height: 38px;
    border-radius: 19px;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 18px;

    &:hover {
        background-color: #E1E1E1;
        cursor: pointer;
    }

    ${props => props.active && `
        border: 1px solid #403DDE;

        > div {
            color: #403DDE;
        }
    `}

`

const BookmarkText = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #555;
    margin-left: 13px;
    margin-right: 6px;
`


const BookmarkIcon = styled.img`
    width: 6px;
    height: 3px;
`

const Xbtn = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 31px;

    &:hover {
        cursor: pointer;
    }
`

const MainContent = ({detail, nextContent, prevContent}) => {

    const imgUrl = '/' + detail.index.toString() + '.png'
    const keys = Object.keys(detail.detail);
    
    return (
        <MainContentContainer>
            <MainImgContainer>
                <NextBtn src="/before.svg" onClick={()=>prevContent(detail)}/>
                <MainImg src={imgUrl} />
                <NextBtn src="/next.svg" onClick={()=>nextContent(detail)}/>
            </MainImgContainer>
            {
                keys.map((item, index) => {
                    return (
                        <MainContentBox key={index}>
                            <MainContentHeader>
                                <MainContentMark />
                                <MainContentTitle>{item}</MainContentTitle>
                            </MainContentHeader>
                            <MainContentText>{detail.detail[item]}</MainContentText>
                        </MainContentBox>
                    )
                })
            }
        </MainContentContainer>
    )
}

const MainContentBox = styled.div`
    margin-top: 15px;
    width: 572px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const MainContentHeader = styled.div`
    width: 100%;
    height: 41px;
    padding: 0px 28px;
    display: flex;
    align-items: center;
`


const MainContentMark = styled.div`
    width: 12px;
    height: 12px;
    margin-right: 15px;
    background-color: #403DDE;
    border-radius: 6px;
`

const MainContentTitle = styled.div`
    flex-direction: column;
    justify-content: center;
    color: #000;
    font-size: 23px;
    font-weight: 700;
`

const MainContentText = styled.div`
    padding: 0px 56px;
    margin-top: 8px;
    width: 100%;
    color: #555;
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    line-height: 22px; /* 157.143% */
`


const MainImgContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
`

const MainContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const MainImg = styled.img`
    border-radius: 30px;
    margin: 0 20px;
    width: 572px;
    height: 572px;
`
const NextBtn = styled.img`
    width: 20px;

    &:hover {
        cursor: pointer;
    }
`


const RelatedContent = ({setDetail, tags}) => {

    const filterByTags = (tagList) => {
        const filterContent = fakeData['fakeContent']
          .filter((item) => {
            // 조건 0: 본 항목은 제외
            return item.tags !== tags;
          })
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
   
      
        return filterContent;
      };

    const relatedContent = filterByTags(tags)

    return(
        <RelatedContentContainer>
            <HeaderContainer>
                <MeunText>관련 이미지</MeunText>
                <MeunTextBar />
            </HeaderContainer>
            <RelatedContentList content={relatedContent} setDetail={setDetail}/>
        </RelatedContentContainer>
    )
}


const RelatedContentContainer = styled.div`
    margin: 0 auto;
    margin-top: 53px;
    height: 100%;
    width: 585px;
    background-color: white;
    border-radius: 30px;

    display: flex; // 부모 요소에게 높이 전달을 위해 flex 사용
    flex-direction: column; // 자식 요소들이 세로로 정렬되도록
    align-items: center; // 가로 중앙 정렬

`

const HeaderContainer = styled.div`
    margin: 20px 0;
    background-color: white;
    height: 43px;
    top: 78px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const MeunText = styled.div`
    color: #000;
    font-size: 20px;
    font-weight: 700;
`

const MeunTextBar = styled.div`
    margin-top: 12px;
    height: 3px;
    width: 94px;
    border-radius: 1.5px;
    background-color: #000;
`


const DetailBox = styled.div`
    margin: 0 auto;
    margin-top: 53px;
    width: 713px;
    background-color: white;
    border-radius: 30px;
`