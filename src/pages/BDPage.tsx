import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import '../App.scss';
import '../styles/BD_styles.scss';
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
          url: 'https://api.jsonbin.io/b/60d016ed8a4cd025b7a209f3',
          method: 'get',
          headers: {
            'secret-key':
              '$2b$10$CpVUDj0M04SrpvTHOlz0Kup12rM2KFWDtuEf.wpY5HwYB6BBSrfCS',
          },
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
        className={`arrow-container  ${!selectedImage ? 'disable' : ''} ${
          fullscreen ? 'fullscreen_arrow-container' : ''
        }`}
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
  const BD_LIST = () => {
    return (
      <div className="arrow-container">
        <div className={`BD-list ${fullscreen ? 'fullscreen_BD-list' : ''}`}>
          <div className="overlay">
            {props.BDList.map((item, index) => (
              <Link key={index} className="BD-right" to={'/BD?bd=' + item.id}>
                <BD {...item} key={index} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };
  const Next = () => {
    return (
      <div className="arrow-container arrow-fullscreen">
        <img onClick={next} src={arrow} alt="next" className="arrow" />
      </div>
    );
  };

  return (
    <ReactFullscreen>
      {({ ref, onRequest, onExit, isEnabled }) =>
        fullscreen ? (
          <div className={'fullscreen'}>
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
            {selectedImage !== bdImage.length - 1 ? <Next /> : <BD_LIST />}
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
              {false && (
                <div className="top-bar">
                  <span className="for_free">Disponible gratuitement :</span>
                  <span className="BD_DU_JOUR">LA BD DU JOUR</span>
                </div>
              )}
              <Previous />
              <div
                className="slide-container"
                style={{
                  paddingRight:
                    selectedImage === bdImage.length - 1 ? '20%' : '0%',
                }}
              >
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
                {selectedImage === bdImage.length - 1 && <BD_LIST />}
              </div>
              {selectedImage !== bdImage.length - 1 && <Next />}
            </div>
          </>
        )
      }
    </ReactFullscreen>
  );
}
