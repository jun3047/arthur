import styled from "styled-components"


const ContentList = ({content, setDetail}) => {
    

    return (
        <ContentContainer>
        {
            content.map((item) => {
                return (
                    <ContentImgBox 
                        src={item.name + '.jpg'} alt="예시 이미지" 
                        onClick={(e)=>{
                            e.preventDefault()
                            console.log('click');
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

    min-width: 400px;
    width: 100%;
    padding-left: 30px;
    margin-top: 29px;
    margin: auto 0;

    @media (max-width: 768px) {

    }
`

const ContentImgBox = styled.img`
    margin-right: 30px;
    margin-bottom: 30px;
    max-width: 220px;
    max-height: 220px;
    border-radius: 20px;
`

export default ContentList