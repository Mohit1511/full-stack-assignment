import React, { useState, useEffect } from 'react';
import { Heading } from './Heading';
import { UnsplashImage } from './UnsplashImage';
import { Loader } from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

import styled from 'styled-components';
import { createApi } from "unsplash-js";
import ScrollToTop from "react-scroll-to-top";

const WrapperImages = styled.section`
  max-width: 350rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-auto-rows: 400px;
`;

export default function App() {
  const [images, setImage] = useState([]);
  const [value, setValue] = useState("animation")
  const [x, setX] = useState("animation")
  const api = createApi({
    accessKey: process.env.REACT_APP_ACCESSKEY
  });

  function refreshPage(){
    window.location.reload();
  } 

 

  let flag = true
  const fetchImages = (count = 1000) => {

    if(flag) {
      api.search.getPhotos({ 
        query: value,
        perPage: 30,
        })
        .then(res => {
          // console.log(value)
          if(x !== value)
          {
            setX(value);
            images.splice(0, images.length)
            setTimeout(() => {
              setImage([...images, ...res.response.results]);  
            }, 10);
          }
          else {
            setTimeout(() => {
              setImage([...images, ...res.response.results]);  
            }, 10);
          }
          flag = false;
          
          
          // console.log(images.length)
        })
        .catch(() => {
          console.log("something went wrong!");
        });
        
    }
    else {
        api.photos.getRandom({ 
        count: 100,
        })
        .then(res => {
          if(x !== value)
          {
            setX(value);
            images.splice(0, images.length)
            setTimeout(() => {
              setImage([...images, ...res.response]);  
            }, 10);
          }
          else
          {
            setTimeout(() => {
              setImage([...images, ...res.response]);  
            }, 10);
          }
          flag = true;
        })
        .catch(() => {
          console.log("something went wrong!");
        });
    } 
  }

  useEffect(() => {
    fetchImages();
  }, [value]);

  return (
    <div>
      <Heading/> 
      <section class="portfolio-section">
          <div class="container">
            <div class="portfolio-filter controls">
              <button class="control btn instagram"  type="button" onClick={value => setValue("animation")}><span class="gradient">All</span></button>
              <button class="control btn instagram"  type="button" onClick={value => setValue("webdesign")}><span class="gradient">Web design</span></button>
              <button class="control btn instagram"  type="button" onClick={value => setValue("digital-design")}><span class="gradient">Digital Design</span></button>
              <button class="control btn instagram"  type="button" onClick={value => setValue("3d-rendering")}><span class="gradient">3D rendering</span></button>
            </div>
          </div>
      
          <InfiniteScroll
            dataLength={images.length}
            next={fetchImages}
            hasMore={true}
            loader={<Loader/>}
            scrollableTarget="scrollablediv"
          > 
            <WrapperImages>
              {
                images.map(image => {
                  return <UnsplashImage url={image.urls.thumb} key={image.id}/>
                })
              }
            </WrapperImages>
            
          </InfiniteScroll>
      </section>
      <button onClick={refreshPage} > <ScrollToTop smooth color="#6f00ff"> </ScrollToTop></button>
    </div>
  );
}