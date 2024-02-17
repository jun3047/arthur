import styled from "styled-components"
import { useState } from "react"
import fakeData from '../constants.json';
import { useEffect } from "react";


export const BigFilterPage = ({initTags, filterBtnHandler, getFilterN}) => {
    
    const [tags, setTags] = useState(initTags)
    
    const handleTagClick = (tag) => {

        const isTagSelected = tags.includes(tag);
        if (isTagSelected) setTags(tags.filter(selectedTag => selectedTag !== tag));
        else setTags([...tags, tag]);
    };

    const FilterN = getFilterN(tags)

    return (
        <BigFilterBoxContainer>
            <BigFilterBoxContainerInner>
                <FitlerRefreshBtn onClick={()=>setTags([])}/>
                <FilterBoxItemWrapper>
                {
                    FilterBoxList.map((item, index) => {
                        return (
                            <FilterBoxItem
                                nowTags={tags}
                                handleTagClick={handleTagClick}
                                item={item}
                                key={index}
                            />
                        )
                    })
                }
                </FilterBoxItemWrapper>
                <FitlerBtn onClick={()=>filterBtnHandler(tags)}>
                    {
                        FilterN === 0 ? '필터 초기화' : `${FilterN}개의 결과보기`
                    }
                </FitlerBtn>
            </BigFilterBoxContainerInner>
        </BigFilterBoxContainer>
    )
}

const BigFilterBoxContainerInner = styled.div`

    left: 0;
    position: fixed;
    top: 144px;
    width: 388px;
    height: calc(100vh - 145px);
    background-color: white;
    overflow-y: auto;
`

const FilterPage = ({initTags, offFilter, filterBtnHandler, getFilterN}) => {

    const BIGWIDTH = 1360;

    const [isBigScreen, setIsBigScreen] = useState(window.innerWidth > BIGWIDTH);

    useEffect(() => {
        // 윈도우 크기 변화를 감지하는 함수
        const handleResize = () => {
            setIsBigScreen(window.innerWidth > BIGWIDTH);
        };

        // 윈도우 크기가 변할 때마다 handleResize 함수를 호출
        window.addEventListener('resize', handleResize);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => window.removeEventListener('resize', handleResize);
    }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행되도록 함

    // isBigScreen 상태에 따라 다른 컴포넌트 렌더링
    if (isBigScreen) {
        return (
            <BigFilterPage
                initTags={initTags}
                filterBtnHandler={filterBtnHandler}
                getFilterN={getFilterN}
            />
        );
    }


    return (
        <FilterContainer>
            <FilterBox 
                initTags={initTags}
                filterBtnHandler={filterBtnHandler} 
                offFilter={offFilter}
                getFilterN={getFilterN}
            />
        </FilterContainer>
    )
}

const FilterContainer = styled.div`
    z-index: 3;
    top: 0px;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(75, 77, 88, 0.91);
`

const FilterBoxList = fakeData['fakeFilter']

const FilterBox = ({initTags, offFilter, filterBtnHandler, getFilterN}) => {

    const [tags, setTags] = useState(initTags)
    
    const handleTagClick = (tag) => {

        const isTagSelected = tags.includes(tag);
    
        if (isTagSelected) setTags(tags.filter(selectedTag => selectedTag !== tag));
        else setTags([...tags, tag]);
    };

    const FilterN = getFilterN(tags)

    return (
        <FilterBoxContainer>
            <FitlerBoxHeader>
                <FitlerBoxTitle>필터</FitlerBoxTitle>
                <BackBtn src="/back.svg" onClick={offFilter}/>
            </FitlerBoxHeader>
            <FitlerRefreshBtn onClick={()=>setTags([])}/>
            <FilterBoxItemWrapper>
            {
                FilterBoxList.map((item, index) => {
                    return (
                        <FilterBoxItem
                            nowTags={tags}
                            handleTagClick={handleTagClick}
                            item={item}
                            key={index}
                        />
                    )
                })
            }
            </FilterBoxItemWrapper>
            <FitlerBtn onClick={()=>{
                    filterBtnHandler(tags)
                    offFilter()
            }}>
            { FilterN === 0 ? '필터 초기화' : `${FilterN}개의 결과보기` }
            </FitlerBtn>
        </FilterBoxContainer>
    )
}

const FilterBoxItemWrapper = styled.div`
    max-height: calc(100% - 150px);
    overflow-y: auto;
    overscroll-behavior: contain;
`


const FitlerBtn = styled.div`

    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;

    background-color: #403DDE;
    width: 232.3px;
    height: 46px;
    border-radius: 37px;

    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 16px;

    &:hover {
        cursor: pointer;
    }
` 

const FilterBoxItem = ({item, handleTagClick, nowTags}) => {

    const [isItemOpen, setIsItemOpen] = useState(false);

    return (
        <FilterBoxItemContainer isOpen={isItemOpen}>
            <FilterBoxItemTitle onClick={()=>setIsItemOpen(!isItemOpen)}>
                {isItemOpen ? 
                    <ToggleBtn src="/toggle.svg"/>:
                    <ToggleBtn src="/up.svg"/>
                }
                {item.name}
            </FilterBoxItemTitle>
            <FilterBoxItemBox remainder={item.children.length % 3}>
                {
                    isItemOpen && item.children.map((tag) => {

                        const isTagSelected = nowTags.includes(tag);

                        return (
                            <FilterBoxItemBtn
                                isTagSelected={isTagSelected}
                                onClick={()=>handleTagClick(tag)}>
                            {tag}</FilterBoxItemBtn>
                        )
                    })
                }
            </FilterBoxItemBox>
        </FilterBoxItemContainer>
    )
}

const FilterBoxItemBox = styled.div`
    display: flex;
    flex-wrap: wrap;

    > :nth-last-child(1) {
        ${({ remainder }) => {
            const flexBasis = remainder !== 0 ? '50%' : '33.3%';
            return `
                flex-basis: calc(${flexBasis} - 10px);
                margin-right: 10px;
            `;
        }}
    }

    > :nth-last-child(2) {
        ${({ remainder }) => {
            const flexBasis = remainder === 2 ? '50%' : '33.3%';
            return `
                flex-basis: calc(${flexBasis} - 10px);
                margin-right: 10px;
            `;
        }}
    }

    > :nth-child(1),
    > :nth-child(2),
    > :nth-child(3) {
        margin-top: 10px;
    }
`

const FilterBoxItemBtn = styled.div`
    height: 31px;
    border: 0.5px solid #CFCFCF;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 5px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #C8C8C8;
    color: ${props => props.isTagSelected ? '#FFFFFF' : '#5B5B5B'};
    flex-basis: calc(33.33% - 10px); /* 한 줄에 3개씩, 간격은 margin-right로 조절 */
    background-color: ${props => props.isTagSelected ? '#403DDE' : '#FCFCFC'};
    
    &:hover {
        background-color: ${props => props.isTagSelected ? '#403DDE' : '#E8E8E8'};
        color: ${props => props.isTagSelected ? '#FFFFFF' : '#403DDE'};
        border: 1px solid #403DDE;
        cursor: pointer;
    }
    
    &:active {
        background-color: ${props => props.isTagSelected ? '#403DDE' : '#403DDE'};
        color: #FFFFFF;
    }

`

const FilterBoxItemContainer = styled.div`
    border-top: 1px solid #C8C8C8;
    width: 100%;
    padding: 10px 22px;
    margin-top: 7px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 17.5px;

    &:hover {
        cursor: pointer;
        background-color: ${({isOpen})=> isOpen ?  '#FFFFFF' : '#EDEDED'}
    }
`


const FilterBoxItemTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #000;
    font-size: 16px;
    font-weight: 700;

    &:hover {
        cursor: pointer;
    
    }
`


const ToggleBtn = styled.img`
    width: 14.94px;
    height: 7.47px;
    margin-right: 10px;

    &:hover {
        cursor: pointer;
    }
`


const FitlerBoxTitle = styled.div`
    position: absolute;

    font-size: 18px;
    font-weight: 700;
    color: black;
`

const FitlerBoxHeader = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 57px;
    width: 388px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`

const BackBtn = styled.img`

    padding: 10px 14px;
    position: absolute;
    left: 12px;

    &:hover {
        cursor: pointer;
    }
`

const FilterBoxContainer = styled.div`
    right: 0px;
    position: absolute;
    top: 0;
    z-index: 1;
    width: 388px;
    height: 100%;
    background-color: white;
    scroll-behavior: contain;
    overflow-y: auto;

    padding-top: 50px;
`

const BigFilterBoxContainer = styled.div`
    position: relative;
    width: 388px;
    background-color: white;
    scroll-behavior: contain;
    overflow-y: auto;
`

const FitlerRefreshBtn = ({onClick}) => {

    return (
        <FitlerRefreshBtnLayout onClick={onClick}>
            <FitlerRefreshBtnWarpper>
                <RefreshIcon src="/refresh.svg" />
                <RefreshText>새로고침</RefreshText>
            </FitlerRefreshBtnWarpper>
        </FitlerRefreshBtnLayout>
    )
}

const FitlerRefreshBtnLayout = styled.div`
    width: 100%;
    background-color: white;
    padding: 10px 22px;

    display: flex;
    justify-content: flex-end;

`

const RefreshText = styled.div`
    font-size: 14px;
    color: #555555;
`

const RefreshIcon = styled.img`
    width: 12px;
    height: 12px;
`

const FitlerRefreshBtnWarpper = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;

    width: 113px;
    height: 32px;
    border-radius: 20px;
    
    background-color: #EDEDED;
    border: none;

    &:hover {
        cursor: pointer;
        border: 1px solid #C8C8C8;
    }
`



export default FilterPage