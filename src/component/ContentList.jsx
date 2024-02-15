import styled from "styled-components"
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useRef } from "react";


const ContentList = ({content, setDetail}) => {

    const ref = useRef(null)

    return (
        <ContentContainer>
            <AutoSizer>
            {({ height, width }) => {

                const columnCount = width < 1240 ? 3 : 5;
                
                //MainGrid의 마지막 요소의 index를 가져오기 

                const nowContent = content

                const Cell = ({ columnIndex, rowIndex, style, data }) => {

                    const item = data[rowIndex*columnCount + columnIndex]
                    console.log(item.index);

                    return (
                        <BlackBackground style={style} key={rowIndex*columnCount + columnIndex}>
                            <ContentImgBox
                                src={ '/webp/'+ item.index + '.webp'} alt="예시 이미지" 
                                onClick={(e)=>{
                                    e.preventDefault()
                                    setDetail(item)
                                }}
                            />
                        </BlackBackground>
                    )
                };
                    
                return (
                    <MainGrid
                        ref={ref}
                        itemData={nowContent}
                        columnCount={columnCount}
                        rowCount={nowContent.length/columnCount}
                        columnWidth={250}
                        rowHeight={250}
                        height={height}
                        width={width}
                        overscanRowCount={1}
                    >
                    {Cell}
                    </MainGrid>
                )
            }}
            </AutoSizer>
        </ContentContainer>
    )
}

const MainGrid = styled(Grid)`
    display: flex;
    justify-content: center;

    > div {
        position: relative;
    }
`

export const RelatedContentList = ({content, setDetail}) => {

    const nowContent = content.slice(0, 15)

    return (
        <RelatedContentContainer>
        {
            nowContent.map((item) => {
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

    margin: 15px;
    max-width: 220px;
    max-height: 220px;
    border-radius: 20px;

    overflow: hidden;
    background-color: black;

`

const ContentContainer = styled.div`

    width: 100%;
    height: 100%;
`

const RelatedContentContainer = styled.div`

    width: 195*3px;
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