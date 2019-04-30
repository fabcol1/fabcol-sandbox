// forked from https://noahyamamoto.com/blog/mousetrailanimation
// https://stackoverflow.com/questions/15750755/create-beziers-curve-with-only-start-and-endpoint
// https://pomax.github.io/bezierinfo/#circles_cubic
// https://codepen.io/bryjch/pen/QEoXwA?editors=0010

import React from 'react';

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lifetime = 0;
    this.flip = false;
  }
  // Get the distance between this & b
  distance(b) {
    const dx = this.x - b.x;
    const dy = this.y - b.y;

    return Math.sqrt(dx * dx + dy * dy);
  }
  // Get the mid point between this & b
  midPoint(b) {
    const mx = this.x + (b.x - this.x) * 0.5;
    const my = this.y + (b.y - this.y) * 0.5;
    return new Point(mx, my);
  }
  // Get the angle between this & b
  angle(b) {
    const dx = this.x - b.x;
    const dy = this.y - b.y;
    return Math.atan2(dy, dx);
  }
  // Simple getter for printing
  pos() {
    return this.x + ',' + this.y;
  }
}

class MouseTrailNy extends React.Component {
  constructor() {
    super();
    this.state = {
      cHeight: 0,
      cWidth: 0,
    };
    this.canvas = React.createRef();
    this.resizeEventHandler = this.resizeEventHandler.bind(this);
  }

  resizeEventHandler() {
    this.setState({
      cHeight: document.body.clientHeight,
      cWidth: document.body.clientWidth,
    });
  }

  componentDidMount = () => {
    // Set height and width on load because if set in state body isn't defined yet.
    this.setState({
      cHeight: document.body.clientHeight,
      cWidth: document.body.clientWidth,
    });

    window.addEventListener('resize', this.resizeEventHandler, false);

    // If the device supports cursors, start animation.
    if (matchMedia('(pointer:fine)').matches) {
      this.startAnimation();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEventHandler);
  }

  startAnimation = () => {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');

    const points = [];

    const addPoint = (x, y) => {
      const point = new Point(x, y);
      points.push(point);
    };

    document.addEventListener(
      'mousemove',
      ({ clientX, clientY }) => {
        addPoint(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
      },
      false,
    );

    const animatePoints = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const duration = (0.7 * (1 * 1000)) / 60; // Last 80% of a frame per point

      for (let i = 0; i < points.length; ++i) {
        const point = points[i];
        let lastPoint;

        if (points[i - 1] !== undefined) {
          lastPoint = points[i - 1];
        } else lastPoint = point;

        point.lifetime += 1;

        if (point.lifetime > duration) {
          // If the point dies, remove it.
          points.shift();
        } else {
          // Otherwise animate it:

          // As the lifetime goes on, lifePercent goes from 0 to 1.
          const lifePercent = point.lifetime / duration;
          const spreadRate = 7 * (1 - lifePercent);

          ctx.lineJoin = 'round';
          ctx.lineWidth = spreadRate;

          // As time increases decrease r and b, increase g to go from purple to green.
          const red = Math.floor(190 - 190 * lifePercent);
          const green = Math.floor(210 + 210 * lifePercent);
          const blue = 0;
          const distance = point.distance(lastPoint, point);
          const midpoint = point.midPoint(lastPoint, point);
          const angle = point.angle(lastPoint, point);

          ctx.strokeStyle = `rgb(${red},${green},${blue}`;
          ctx.beginPath();

          ctx.arc(
            midpoint.x,
            midpoint.y,
            distance / 2,
            angle,
            angle + Math.PI,
            point.flip,
          );

          //ctx.moveTo(lastPoint.x, lastPoint.y);
          // ctx.lineTo(point.x, point.y);

          ctx.stroke();
          ctx.closePath();
        }
      }
      requestAnimationFrame(animatePoints);
    };

    animatePoints();
  };

  render = () => {
    const { cHeight, cWidth } = this.state;
    return <canvas ref={this.canvas} width={cWidth} height={cHeight} />;
  };
}

export default MouseTrailNy;
