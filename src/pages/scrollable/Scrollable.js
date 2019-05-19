import React, { Component } from 'react';
import MouseTrailLine from '../../components/mouse-trails/MouseTrailLine';
import MouseTrailSemiCircle from '../../components/mouse-trails/MouseTrailSemiCircle';
import MouseTrailSemiCircleFlip from '../../components/mouse-trails/MouseTrailSemiCircleFlip';

export default class Scrollable extends Component {
  render() {
    return (
      <div className="bg-light" style={{ height: '200vh', width: '100vw' }}>
        <MouseTrailSemiCircleFlip />
      </div>
    );
  }
}
