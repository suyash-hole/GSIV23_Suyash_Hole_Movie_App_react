
import styled from 'styled-components';
import MovieComponent from './components/MovieComponent';
import React, { useState } from "react";
import Axios from "axios";

import MovieInfoComponent from "./components/MovieInfoComponent";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const API_KEY = 'f5666d4';
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 15px;
  
  margin-left: 20px;
  
  
`;

const Header = styled.div`
background-color:#4285F4;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  width: 100%;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const AppName = styled.div`
display:flex;
color:white;
flex-directions:row;
align-items: center;
`;
const SearchIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-left: 10px;
`;
const SearchInput = styled.input`
  color:black;
  outline:none;
  background-color: white;
  
  border:none;
  margin-left:15px;
  
`;
const MovieListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
gap: 25px;
justify-content: space-evenly;;
  
`;
function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          
          React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="search.png" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="theater.png" />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
