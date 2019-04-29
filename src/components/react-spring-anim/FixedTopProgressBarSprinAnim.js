import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spring } from 'react-spring/renderprops';

/*
  dependencies: bootstrap, react-spring
  Use case:
  <FixedTopProgressBarSprinAnim
      backgroundColor="yellow"
      backgroundImage="linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)"
      height="5px"
      tension="200"
      friction="180"
    />
*/

class FixedTopProgressBarSprinAnim extends Component {
  constructor() {
    super();
    this.state = {
      opacity: 1,
      number: 0,
    };
  }

  render() {
    const {
      backgroundColor,
      backgroundImage,
      height,
      tension,
      friction,
    } = this.props;

    return (
      <div className="fixed-top" style={{ zIndex: '2000' }}>
        <Spring
          from={{ number: this.state.number, opacity: this.state.opacity }}
          to={{ number: 100, opacity: 1 }}
          config={{ tension, friction }}>
          {props => (
            <div
              style={{
                width: props.number + '%',
                backgroundColor: backgroundColor,
                backgroundImage: backgroundImage,
                height: height,
                opacity: this.state.opacity,
              }}
            />
          )}
        </Spring>
      </div>
    );
  }
}

FixedTopProgressBarSprinAnim.propTypes = {};

const mapStateToProps = state => ({
  clientInfo: state.clientInfo,
});

export default connect(
  mapStateToProps,
  {},
)(FixedTopProgressBarSprinAnim);
