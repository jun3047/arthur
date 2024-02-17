import styled from "styled-components"
import InfiniteScroll from "react-infinite-scroll-component"
import ContentLoader from 'react-content-loader';
import { useState, useEffect } from "react"

const ContentList = ({ content, setDetail, fetchMoreData, hasMore }) => {

    return (
      <InfiniteScroll
        dataLength={content.length} // 현재 보여지는 콘텐츠의 길이
        next={fetchMoreData} // 추가 데이터를 불러오는 함수
        hasMore={hasMore} // 더 불러올 데이터가 있는지 여부
      >
        <ContentContainer>
          {content.map((item) => (
            <ContentItem
              item={item}
              setDetail={setDetail}
            />
          ))}
        </ContentContainer>
      </InfiniteScroll>
    );
  };

const ContentItem = ({item, setDetail}) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [item])

  return (
    <BlackBackground key={item.index}>
      {loading && (
        <ContentLoader
          speed={2}
          width={225}
          height={225}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"            
        >
        <rect x="0" y="0" rx="20" ry="20" width="225" height="225" />
        </ContentLoader>
      )}
      <ContentImgBox
        src={'/webp/' + item.index + '.webp'}
        alt="예시 이미지"
        onLoad={() => setLoading(false)}
        onClick={(e) => {
          e.preventDefault();
          setDetail(item);
        }}
      />
      </BlackBackground>
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

    width: 500px;
    overscroll-behavior: contain;

    @media (min-width: 768px) {
        width: 750px;
    }

    @media (min-width: 1200px) {
        width: 1000px;
    }
    
    @media (min-width: 1630px) {
      width: 1250px;
    }
`

const RelatedContentContainer = styled.div`

    width: calc(195*3px);
    overscroll-behavior: contain;
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