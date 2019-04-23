import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Spring } from 'react-spring/renderprops';

import styles from './Navbar.module.css';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      opacity: 1,
      number: 0,
      resetAnimation: false,
    };
    this.resetAnimation = this.resetAnimation.bind(this);
    this.animationEnd = this.animationEnd.bind(this);
  }

  resetAnimation(e) {
    this.setState({
      ...this.state,
      resetAnimation: true,
      opacity: 1,
    });
  }
  animationEnd(e) {
    this.setState({
      ...this.state,
      opacity: 0,
    });
  }

  render() {
    const { isMobileBrowser } = this.props.clientInfo;
    return (
      <div>
        <div className="fixed-top" style={{ zIndex: '2000' }}>
          <Spring
            from={{ number: this.state.number, opacity: this.state.opacity }}
            to={{ number: 100, opacity: 1 }}
            config={{ tension: 200, friction: 180 }}
            onRest={this.animationEnd}
            reset={this.state.resetAnimation}>
            {props => (
              <div
                style={{
                  width: props.number + '%',
                  backgroundColor: 'yellow',
                  height: isMobileBrowser ? '5px' : '5px',
                  opacity: this.state.opacity,
                }}
              />
            )}
          </Spring>
        </div>
        <nav
          className={[
            'navbar navbar-expand-lg bg-white fixed-top',
            styles.borderBottom,
          ].join(' ')}>
          <div className="container">
            <Link
              to="/"
              className={['navbar-brand', styles.empty].join(' ')}
              onClick={this.resetAnimation}>
              <img alt="logo" height="30" width="30" src="./favicon.ico" />
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {};

const mapStateToProps = state => ({
  clientInfo: state.clientInfo,
});

export default connect(
  mapStateToProps,
  {},
)(Navbar);
