import React from 'react'
import Banner from '../../components/Banner';
import Category from '../../components/Category';
import Row from '../../components/Row';
import styled from 'styled-components';
import Nav from '../../components/Nav';
import requests from '../../api/requests';



const MainPage = () => {
  return (
    <Container>

      <Banner />
      <Category />
      <Row title="현재 상영되는 영화" id="NP" fetchUrl={requests.NowPlaying} />
      <Row title="이번 달 트렌드" id="TR" fetchUrl={requests.Trend} />
      <Row title="이번 달 탑랭크" id="TOP" fetchUrl={requests.TopRank} />
      <Row title="인기 상영작" id="PL" fetchUrl={requests.Popularity} />
    </Container>
  );
}

export default MainPage;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url('/images/home-background.png') center center / cover no-repeat fixed;
    content: '';
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
