import styled from "styled-components"

export const BookMarkHeader = ({title, BackBtnHandler, makeNewBookmark}) => {

    const mainTitle = title ? title : "내 북마크"

    return (
        <HeaderContainer>
            <BackBtn src="/back.png" onClick={BackBtnHandler}/>
            <MeunText>{mainTitle}</MeunText>
            <PlusBtn src="/plus.png" onClick={makeNewBookmark}/>
            <MeunTextBar />
        </HeaderContainer>
    )
}

const BackBtn = styled.img`
    position: absolute;
    left: 22px;

    &:hover {
        cursor: pointer;
    }
`

const PlusBtn = styled.img`
    position: absolute;
    right: 22px;

    &:hover {
        cursor: pointer;
    }
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
