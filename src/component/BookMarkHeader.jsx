import styled from "styled-components"
import { useNavigate } from "react-router-dom" 


const fakeBookmark = ["정준"]

export const BookMarkHeader = () => {

    const navigation = useNavigate()

    return (
        <HeaderContainer>
            <BackBtn src="/back.png" onClick={()=>navigation('/')}/>
            <MeunText>내 북마크</MeunText>
            <PlusBtn src="/plus.png" />
            <MeunTextBar />
        </HeaderContainer>
    )
}

const BackBtn = styled.img`
    position: absolute;
    left: 22px;
`

const PlusBtn = styled.img`
    position: absolute;
    right: 22px;
`


const MeunText = styled.div`
    color: #000;
    font-size: 20px;
    font-weight: 700;
`

const MeunTextBar = styled.div`
    position: absolute;
    bottom: 11px;
    height: 3px;
    width: 94px;
    border-radius: 1.5px;
    background-color: #000;
`


const HeaderContainer = styled.div`
    z-index: 1;
    min-width: 768px;
    width: 100%;
    padding: 18px 22px 19px 22px;
    background-color: white;
    height: 66px;
    display: flex;
    position: fixed;
    top: 78px;
    align-items: center;
    justify-content: center;
`
