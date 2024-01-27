import styled from "styled-components"


const ContentList = ({content, setDetail}) => {

    return (
        <ContentContainer>
        {
            content.map((item) => {
                return (
                    <ContentImgBox 
                        src={ '/'+ item.index + '.png'} alt="예시 이미지" 
                        onClick={(e)=>{
                            e.preventDefault()
                            setDetail(item)
                        }}
                    />
                )
            })
        }
        </ContentContainer>
    )
}

const ContentContainer = styled.div`

    width: 750px;
    overscroll-behavior: contain;

    @media (max-width: 768px) {
        width: 500px;
    }
`

const ContentImgBox = styled.img`
    margin: 15px;
    max-width: 220px;
    max-height: 220px;
    border-radius: 20px;

    &:hover {
        cursor: pointer;
    }
`

export default ContentList