import React from 'react';
import building from '../assets/gif/building.gif';
import ladderMan from '../assets/gif/ladderMan.gif';
import { ReactTypical } from '@deadcoder0904/react-typical';
import ProjectCards from '../layouts/ProjectCards';
import { Footer } from '../layouts/Footer';
export default function Home() {
  return (
    <>
      <div className='home-page-container'>
        <div className='home-container'>
          <div className='company-name-container'>
            <div>
              {' '}
              <h1>
                <ReactTypical
                  loop={Infinity}
                  wrapper='b'
                  steps={[
                    'Vihanga Electricals & Constructions',
                    1000,
                    'your deam builder',
                    1000,
                  ]}
                />
              </h1>
            </div>
          </div>
          <div className='gif-container'>
            <div>
              <img src={ladderMan} alt='manOnLadder' />
            </div>
            <div>
              <img src={building} alt='building' />
            </div>
          </div>
        </div>
        <div className='home-container project-card'>
          <div className='recent-project-title'>
            <div className='title'>
              <h1>Recent projects</h1>
            </div>
          </div>
          <div className='recent-project-container'>
            <div className='project-card-container'>
              <div>
                <ProjectCards></ProjectCards>
              </div>
              <div>
                <ProjectCards></ProjectCards>
              </div>
              <div>
                <ProjectCards></ProjectCards>
              </div>
            </div>
          </div>
        </div>
        <div className='home-container home-services'></div>
        <div className='home-container home-about_us'></div>
        <Footer></Footer>
      </div>
    </>
  );
}
