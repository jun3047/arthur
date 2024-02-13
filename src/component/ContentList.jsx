import styled from "styled-components"


const ContentList = ({content, setDetail}) => {

    return (
        <ContentContainer>
        {
            content.map((item) => {
                return (
                    <BlackBackground>
                        <ContentImgBox
                            src={ '/webp/'+ item.index + '.webp'} alt="예시 이미지" 
                            onClick={(e)=>{
                                e.preventDefault()
                                setDetail(item)
                            }}
                        />
                    </BlackBackground>
                )
            })
        }
        </ContentContainer>
    )
}

export const RelatedContentList = ({content, setDetail}) => {

    return (
        <RelatedContentContainer>
        {
            content.map((item) => {
                return (
                    <RelatedBlackBackground>
                        <ContentImgBox
                            src={ '/webp/'+ item.index + '.webp'} alt="예시 이미지" 
                            onClick={(e)=>{
                                e.preventDefault()
                                setDetail(item)
                            }}
                        />
                    </RelatedBlackBackground>
                )
            })
        }
        </RelatedContentContainer>
    )
}

const RelatedBlackBackground = styled.div`

    float: left;

    margin: 15px;
    max-width: 165px;
    max-height: 165px;
    border-radius: 20px;

    overflow: hidden;
    background-color: black;
`

const BlackBackground = styled.div`

    float: left;

    margin: 15px;
    max-width: 220px;
    max-height: 220px;
    border-radius: 20px;

    overflow: hidden;
    background-color: black;

`

const ContentContainer = styled.div`

    width: 750px;
    overscroll-behavior: contain;

    @media (max-width: 768px) {
        width: 500px;
    }
`

const RelatedContentContainer = styled.div`

    width: 195*3px;
    overscroll-behavior: contain;

    @media (max-width: 768px) {
        width: 195*3px;
    }
`

const ContentImgBox = styled.img`

    width: 100%;
    height: 100%;

    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`

export default ContentList