import styled from "styled-components"
import { useState } from "react"
import fakeData from '../constants.json';


const FilterPage = ({offFilter, filterBtnHandler}) => {
    return (
        <FilterContainer>
            <FilterBox 
                filterBtnHandler={filterBtnHandler} 
                offFilter={offFilter}/>
        </FilterContainer>
    )
}

const FilterContainer = styled.div`
    z-index: 3;
    top: 0px;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(75, 77, 88, 0.91);
`







const FilterBoxList = fakeData['fakeFilter']

const FilterBox = ({offFilter, filterBtnHandler}) => {

    const [tags, setTags] = useState([])
    
    const handleTagClick = (tag) => {

        const isTagSelected = tags.includes(tag);
    
        if (isTagSelected) setTags(tags.filter(selectedTag => selectedTag !== tag));
        else setTags([...tags, tag]);
    };

    return (
        <FilterBoxContainer>
            <FitlerBoxHeader>
                <FitlerBoxTitle>필터</FitlerBoxTitle>
                <BackBtn src="/back.png" onClick={offFilter}/>
            </FitlerBoxHeader>
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
                N개의 결과보기
            </FitlerBtn>
        </FilterBoxContainer>
    )
}

const FilterBoxItemWrapper = styled.div`
    padding: 50px 0 80px 0;
    max-height: 100%;
    overflow-y: auto;
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
` 

const FilterBoxItem = ({item, handleTagClick, nowTags}) => {

    const [isItemOpen, setIsItemOpen] = useState(false);

    return (
        <FilterBoxItemContainer>
            <FilterBoxItemTitle>
                <ToggleBtn src="/toggle.png"/>
                {item.name}
            </FilterBoxItemTitle>
            <FilterBoxItemBox>
                {
                    !isItemOpen && item.children.map((tag) => {

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
    margin-top: 15px;
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
`

const FilterBoxItemContainer = styled.div`
    border: 0.5px soild #CFCFCF;
    width: 100%;
    padding: 0 22px;
    margin-top: 30px;
`


const FilterBoxItemTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #000;
    font-size: 16px;
    font-weight: 700;
`


const ToggleBtn = styled.img`

    width: 14.94px;
    height: 7.47px;
    margin-right: 10px;
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
    width: 378px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`

const BackBtn = styled.img`
    position: absolute;
    left: 22px;
`

const FilterBoxContainer = styled.div`

    right: 0px;
    position: absolute;
    z-index: 4;
    width: 388px;
    height: 100%;
    background-color: white;
`



export default FilterPage