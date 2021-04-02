import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
  height: 100%;
  on: hover{
    -webkit-transform: scale(1.5);
	transform: scale(1.5);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
  }
	
`;

export const UnsplashImage = ({ url, key }) => {
  return (
    <>
      <Img  src={url} key={key} alt=""/>
    </>
  )
}