import React from 'react';
import './Resources.css'
import Cyber1 from '../Images/CyberResource_1.jpg'
import Cyber2 from '../Images/cqlogo.png'
export default function Resources() {
  return (
    <div className='resource-container'>
      <h1 className="title">Resources</h1>
      <p className="p-text">Resources used to make you a better hacker</p>


    <section className='resource-content'>
      <p className='resource-text'>
      <img src={Cyber1} loading="lazy" alt="Group" className="images"/>

      </p>

      <p className='resource-text'>
      <img src={Cyber2} loading="lazy" alt="Group" className="images"/>


      </p>

      <p className='resource-text'>
      

      </p>

      <p className='resource-text'>
      

      </p>
    </section>
    </div>
  );
}
