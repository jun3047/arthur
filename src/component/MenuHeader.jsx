import styled from "styled-components"


export const MenuHeader = () => {
    return (
        <HeaderContainer>
            <MeunText>My HOME</MeunText>
            <MeunTextBar />
        </HeaderContainer>
    )
}

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
