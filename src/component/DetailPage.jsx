import styled from "styled-components"
import ContentList from "./ContentList"
import fakeData from '../constants.json';
import {useEffect, useState} from "react"
import { BookmarkToggle } from "./BookmarkToggle";
import bookmarkIcon from '../asset/bookmark.svg'

export const DetailPage = ({detail, setDetail}) => {

    const close = () => setDetail(undefined)

    const nowContent = fakeData['fakeContent'].find((item) => item.name === detail.name)

    return (
        <BackgroundDark>
            <DetailContainer>
                <DetailBox>
                    <DetailHeader  nowContent={nowContent} close={close} />
                    <MainContent detail={detail}/> 
                    <RelatedContent setDetail={setDetail}/>
                </DetailBox>
            </DetailContainer>
        </BackgroundDark>
    )
}
const BackgroundDark = styled.div`
    top: 0px;
    position: absolute;
    z-index: 2;
    width: 100vw;
    height: 1000vh;
    background: rgba(75, 77, 88, 0.91);

    display: flex;
    justify-content: center;
`


const DetailContainer = styled.div`
    z-index: 3;
    top: 0px;
    position: absolute;
`

const DetailHeader = ({close, nowContent}) => {

    const initActive = () => fakeData['fakeBookmark']
        .find((bookmark) => bookmark.names.includes(nowContent.name))

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
    padding-top: 53px;
    padding-bottom: 15px;
    margin: 28px 34px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 41px;
    background-color: white;
`

const BookmarkMeun = ({nowContent, onBookmark}) => {

    const initBookmark = fakeData['fakeBookmark'][0]
    const [onBookmarkToggle, setOnBookmarkToggle] = useState(false)

    const bookmarkToggle = () => setOnBookmarkToggle(!onBookmarkToggle)

    return (
        <BookmarkContainer onClick={bookmarkToggle}>
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
`

const MainContent = ({detail}) => {

    const imgUrl = '/' + detail.name + '.jpg'
    const keys = Object.keys(detail.detail);
    
    return (
        <MainContentContainer>
            <MainImgContainer>
                <NextBtn src="/before.svg" />
                <MainImg src={imgUrl} />
                <NextBtn src="/next.svg" />
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
`

const RelatedContent = ({setDetail}) => {

    //관련 이미지 가져와서 넣기
    const fakeContent = [
        {
            name: "예시이미지",
            detail: {
                '이름': '정준',
                '외모': "김묻음",
                '성격': '개발짱',
                '말투': '영어장인',
                '시련과 극복': '나를 죽이지 못하는 어쩌구',
                '과거사': '과거는 비밀',
            },
            tags: ['남자', '예쁜', '현대'],
            isBookmark: false,
        },
        {
            name: "예시이미지",
            detail: {
                '이름': '정준',
                '외모': "김묻음",
                '성격': '개발짱',
                '말투': '영어장인',
                '시련과 극복': '나를 죽이지 못하는 어쩌구',
                '과거사': '과거는 비밀',
            },
            tags: ['남자', '예쁜', '현대'],
            isBookmark: false,
        },
    ]

    return(
        <div>
            <HeaderContainer>
                <MeunText>관련 이미지</MeunText>
                <MeunTextBar />
            </HeaderContainer>
            <ContentList content={fakeContent} setDetail={setDetail}/>
        </div>
    )
}


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
    margin-top: 53px;
    width: 713px;
    background-color: white;
    border-radius: 30px;
`