import styled from "styled-components"
import InfiniteScroll from "react-infinite-scroll-component"

const ContentList = ({ content, setDetail, fetchMoreData, hasMore }) => {
    return (
      <InfiniteScroll
        dataLength={content.length} // 현재 보여지는 콘텐츠의 길이
        next={fetchMoreData} // 추가 데이터를 불러오는 함수
        hasMore={hasMore} // 더 불러올 데이터가 있는지 여부
      >
        <ContentContainer>
          {content.map((item) => (
            <BlackBackground key={item.index}>
              <ContentImgBox
                src={'/webp/' + item.index + '.webp'}
                alt="예시 이미지"
                onClick={(e) => {
                  e.preventDefault();
                  setDetail(item);
                }}
              />
            </BlackBackground>
          ))}
        </ContentContainer>
      </InfiniteScroll>
    );
  };
  

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