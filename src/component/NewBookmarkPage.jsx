import styled from "styled-components"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import fakeData from '../constants.json';


export const NewBookmarkPage = ({setDetail}) => {

    const [bookmarkName, setBookmarkName] = useState('')
    const navigation = useNavigate()

    const close = () => {
        setDetail(undefined)
        navigation('/bookmark')
    }
    
    const addBookmark = () => {
        fakeData['fakeBookmark'].push({title: bookmarkName, indexs: []})
        close()
        console.log("fakeBookmark:", fakeData['fakeBookmark']);
    }
    
    return (
        <BackgroundDark>
            <DetailContainer>
                <DetailBox>
                    <NewBookmarkHeader close={close} />
                    <NewBookmarkTitle>새 북마크 만들기</NewBookmarkTitle>
                    <NewBookmarkInput
                        placeholder="북마크 이름을 입력하세요"
                        value={bookmarkName}
                        onChange={(e)=>setBookmarkName(e.target.value)}
                    />
                    <BookmarkSaveBtn onClick={addBookmark}
                        >만들기
                    </BookmarkSaveBtn>
                </DetailBox>
            </DetailContainer>
        </BackgroundDark>
    )
}


const BookmarkSaveBtn = styled.div`

    position: absolute;
    bottom: 36px;
    right: 52px;


    display: flex;
    justify-content: center;
    align-items: center;
    width: 124px;
    height: 50px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    background-color: #403DDE;
    border-radius: 30px;

    &:hover {
        cursor: pointer;
    }
`


const DetailBox = styled.div`
    padding-top: 64px;
    padding-bottom: 86px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 713px;
    background-color: white;
    border-radius: 30px;
`

const NewBookmarkInput = styled.input`
    margin: auto;
    width: 525px;
    height: 50px;
    margin-bottom: 56px;
    border-radius: 30px;
    border: 1.5px solid #555;
    background: #EDEDED;
    font-size: 18px;
    padding: 16px;
    outline: none;

    &:hover {
        background: #EDEDED;
    }
`

const NewBookmarkTitle = styled.div`
    margin-bottom: 35px;
    color: #000;
    text-align: center;
    font-size: 25px;
    font-weight: 700;
`

const BackgroundDark = styled.div`
    top: 0px;
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgba(75, 77, 88, 0.91);

    display: flex;
    justify-content: center;
    align-items: center;
`


const DetailContainer = styled.div`
    z-index: 3;
    position: relative;
`

const NewBookmarkHeader = ({close}) => {

    return (
        <DetailHeaderContainer>
            <Xbtn 
                src="/x.svg"
                onClick={close}
            />
        </DetailHeaderContainer>
    )
}

const DetailHeaderContainer = styled.div`
    position: absolute;
    top: 24px;
    right: 29px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 41px;
    background-color: white;
`

const Xbtn = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 31px;

    &:hover {
        cursor: pointer;
    }
`