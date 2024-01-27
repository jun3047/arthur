import styled from "styled-components"
import searchIcon from '../asset/searchIcon.svg'
import xIcon from '../asset/x.svg'
import bookmarkIcon from '../asset/bookmark.svg'
import {useNavigate, useLocation} from "react-router-dom"
import { useState } from "react"

export const Header = ({handleSearch}) => {

    const navigate = useNavigate()
    const goToBookmark = () => navigate('/bookmark')
    const goToMain = () => navigate('/')

    return (
        <HeaderContainer>
            <Logo src='/Logo.png' onClick={goToMain}/>
            <SearchBar handleSearch={handleSearch}/>
            <BookmarkBtn 
                goToBookmark={goToBookmark}
            />
        </HeaderContainer>
    )
}


const HeaderContainer = styled.div`
    z-index: 1;
    position: fixed;
    top: 0;
    min-width: 768px;
    width: 100%;
    padding: 18px 22px;
    background-color: white;
    height: 79px;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
`

const Logo = styled.img`
    width: 217px;
    min-width: 217px;
    height: 100%;
    margin-right: 27px;

    &:hover {
        cursor: pointer;
    }
`



const SearchBar = ({handleSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };
    
    const handleClearSearch = () => setSearchTerm('');
    
    const handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            handleSearch(searchTerm);
        }
    }

    if(handleSearch === undefined) return <SearchBarContainer style={{backgroundColor: 'white'}}/>

    return (
        <SearchBarContainer>
            <SearchIcon onClick={()=>handleSearch(searchTerm)}/>
            <HeaderField 
                type="text" 
                placeholder="검색" 
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
            />
            {searchTerm && <XIcon onClick={handleClearSearch}>X</XIcon>}
        </SearchBarContainer>
    )
} 


const BookmarkBtn = ({goToBookmark}) => {

    const location = useLocation()
    const nowBookmarkPage = location.pathname === '/bookmark'

    return (
        <BookmarkContainer 
            active={nowBookmarkPage}
            onClick={goToBookmark}>
            <BookmarkIcon />
        </BookmarkContainer>
    )
}

const BookmarkContainer = styled.div`

    background-color: ${props => props.active ? '#403DDE' : '#555555'};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 20px;

    &:hover {
        cursor: pointer;
    }
`

const HeaderField = styled.input`
    margin-left: 18px;
    height: 40px;
    width: 100%;
    font-size: 18px;
    color: #808080;
    font-weight: 600;
    border: none;
    outline: none;
    background-color: #F2F2F2;
    border-radius: 5px;

`


const SearchIcon = ({onClick}) => {
    return <img onClick={onClick} src={searchIcon} alt="Search Icon" />
}

const XIcon = () => {
    return <img src={xIcon} alt="X Icon" />
}

const BookmarkIcon = () => {
    return <img src={bookmarkIcon} alt="Bookmark Icon" />
}


const SearchBarContainer = styled.div`
    width: 100%;
    max-width: 1010px;
    height: 100%;
    background-color: #F2F2F2;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-radius: 24px;
    padding: 25px;
    margin-right: 25px;
`

export {BookmarkBtn}