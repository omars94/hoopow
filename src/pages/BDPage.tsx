import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import '../App.scss';
import close_fullscreen from '../assets/close_fullscreen.svg';
import { BDSideBar, getImageLink, BD } from '../components';
import arrow from '../assets/arrow.svg';
import { BD_List_TYPE, BD_TYPE } from '../types';
import ReactFullscreen from 'react-easyfullscreen';

BDPage.defaultProps = {
  BDList: [],
};
export default function BDPage(props: { BDList: BD_List_TYPE }) {
  const { search } = useLocation();
  const { bd } = Object.fromEntries(new URLSearchParams(search));
  const [fullscreen, changeFullscreen] = useState(false);

  const [Info_BD, setBD] = useState<BD_TYPE>({
    name: '',
    imageHomepage: '',
    bdImage: [],
  });
  const [selectedImage, selectImage] = useState(0);
  const next = () => {
    if (selectedImage !== bdImage.length - 1) {
      selectImage(selectedImage + 1);
    }
  };
  const previous = () => {
    if (selectedImage !== 0) {
      selectImage(selectedImage - 1);
    }
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      changeFullscreen(false);
    } else if (e.key === 'ArrowRight') {
      next();
    } else if (e.key === 'ArrowLeft') {
      previous();
    }
  });
  useEffect(() => {
    const fetchBD = async () => {
      try {
        const response = await axios({
          url: 'https://api.jsonbin.io/b/60d15d485ed58625fd1658cb',
          method: 'get',
        });
        setBD(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBD();
  }, [bd]);

  let { bdImage } = Info_BD;
  const Previous = () => {
    return (
      <div
        className={'arrow-container ' + (selectedImage !== 0 ? '' : 'disable')}
      >
        <img
          onKeyPress={(event) => console.log(event)}
          onClick={previous}
          src={arrow}
          alt="next"
          className="arrow left"
        />
      </div>
    );
  };
  const Next = ({ showList = false }) => {
    return (
      <div className={'arrow-container BD-list arrow-fullscreen'}>
        {selectedImage !== bdImage.length - 1 ? (
          <img
            onKeyPress={(event) => console.log(event)}
            onClick={next}
            src={arrow}
            alt="next"
            className="arrow"
          />
        ) : (
          showList && (
            <div className="BD-list overlay">
              {props.BDList.map((item, index) => (
                <Link key={index} className="BD-right" to={'/BD?bd=' + item.id}>
                  <BD {...item} key={index} />
                </Link>
              ))}
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <ReactFullscreen>
      {({ ref, onRequest, onExit }) =>
        fullscreen ? (
          <div id={'fullscreen'}>
            <Previous />
            <img
              src={close_fullscreen}
              className="close-fullscreen"
              alt="close full screen"
              onClick={() => {
                changeFullscreen(false);
                onExit();
              }}
            />
            {bdImage.length > 0 && (
              <img
                src={getImageLink(bdImage[selectedImage].bdImageFr)}
                alt={bdImage[selectedImage].name}
                className="image"
              />
            )}
            <Next />
          </div>
        ) : (
          <>
            <BDSideBar
              {...Info_BD}
              changeFullscreen={(value) => {
                changeFullscreen(value);
                onRequest();
              }}
              selectedImage={selectedImage}
            />
            <div className="BDPage-container">
              <div className="top-bar">
                <span className="for_free">Disponible gratuitement :</span>
                <span className="BD_DU_JOUR">LA BD DU JOUR</span>
              </div>
              <Previous />
              <div className="slide-container">
                {bdImage.length > 0 && (
                  <img
                    src={getImageLink(bdImage[selectedImage].bdImageFr)}
                    alt={bdImage[selectedImage].name}
                  />
                )}
                <div>
                  {bdImage.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        selectImage(index);
                      }}
                      className={
                        'pointer ' + (selectedImage === index ? 'active' : '')
                      }
                    />
                  ))}
                </div>
              </div>
              <Next showList={true} />
            </div>
          </>
        )
      }
    </ReactFullscreen>
  );
}
