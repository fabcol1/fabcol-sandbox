import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spring } from 'react-spring/renderprops';
import styles from './Navbar.module.css';

import FixedTopProgressBarSprinAnim from '../react-spring-anim/FixedTopProgressBarSprinAnim';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      noAnim: true,
    };
    this.scrollEvent = this.scrollEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollEvent);
  }

  scrollEvent(e) {
    let noAnim = !(this.divRef.clientHeight - window.scrollY < -80);
    if (window.scrollY === 0) noAnim = true;
    this.setState({
      ...this.state,
      noAnim,
    });
    console.log(noAnim);
  }

  render() {
    const { isMobileBrowser } = this.props.clientInfo;
    const { noAnim } = this.state;

    const divAnimated = (
      <div style={{ position: 'fixed', width: '100%', top: 0 }}>
        <Spring
          from={{ opacity: 0, marginTop: '-80px' }}
          to={{ opacity: 1, marginTop: '0' }}
          config={{ duration: 200 }}>
          {props => (
            <div style={props}>
              <div
                // className="fixed-top"
                style={{ height: '80px', background: 'blue' }}>
                Anim
              </div>
            </div>
          )}
        </Spring>
      </div>
    );
    console.log(divAnimated);
    return (
      <React.Fragment>
        <div ref={element => (this.divRef = element)}>
          {noAnim ? (
            <div className="bg-danger" style={{ height: '80px' }}>
              No Anim
            </div>
          ) : (
            divAnimated
          )}
        </div>
      </React.Fragment>

      // <Spring
      //   from={{ opacity, marginTop: clientHeight }}
      //   to={{ opacity: 1, marginTop: clientHeight * 2 }}
      //   config={{ duration: 1000 }}
      //   reset={{ resetAnimation }}>
      //   {props => (
      //     <div ref={element => (this.divRef = element)} style={props}>
      //       <nav className={classArray.join(' ')}>
      //         <div className="container">
      //           <Link
      //             to="/"
      //             className={['navbar-brand', styles.empty].join(' ')}
      //             onClick={this.resetAnimation}>
      //             <img alt="logo" height="30" width="30" src="./favicon.ico" />
      //           </Link>
      //         </div>
      //       </nav>
      //     </div>
      //   )}
      // </Spring>
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

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { Spring } from 'react-spring/renderprops';
// import styles from './Navbar.module.css';

// import FixedTopProgressBarSprinAnim from '../react-spring-anim/FixedTopProgressBarSprinAnim';

// class Navbar extends Component {
//   constructor() {
//     super();
//     this.state = {
//       opacity: 1,
//       classArray: ['navbar navbar-expand-lg bg-white', styles.borderBottom],
//       resetAnimation: true,
//       canToggleAnim: true,
//       clientHeight: this.divRef !== undefined ? this.divRef.clientHeight : 0,
//     };
//     this.scrollEvent = this.scrollEvent.bind(this);
//   }

//   componentDidMount() {
//     window.addEventListener('scroll', this.scrollEvent);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('scroll', this.scrollEvent);
//   }

//   scrollEvent(e) {
//     if (
//       window.scrollY !== 0 &&
//       this.divRef.clientHeight - window.scrollY < -100 &&
//       this.state.canToggleAnim
//     ) {
//       this.setState({
//         ...this.state,
//         classArray: ['navbar navbar-expand-lg bg-primary', styles.borderBottom],
//         opacity: 0,
//         resetAnimation: true,
//         canToggleAnim: false,
//         clientHeight: this.divRef.clientHeight,
//       });
//     }
//     if (window.scrollY === 0) {
//       this.setState({
//         ...this.state,
//         opacity: 1,
//         classArray: ['navbar navbar-expand-lg bg-white', styles.borderBottom],
//         resetAnimation: false,
//         canToggleAnim: true,
//         clientHeight: 0,
//       });
//     }
//   }

//   render() {
//     const { isMobileBrowser } = this.props.clientInfo;
//     const { opacity, classArray, resetAnimation, clientHeight } = this.state;
//     console.log(clientHeight);
//     return (
//       <Spring
//         from={{ opacity, marginTop: clientHeight }}
//         to={{ opacity: 1, marginTop: clientHeight * 2 }}
//         config={{ duration: 1000 }}
//         reset={{ resetAnimation }}>
//         {props => (
//           <div ref={element => (this.divRef = element)} style={props}>
//             <nav className={classArray.join(' ')}>
//               <div className="container">
//                 <Link
//                   to="/"
//                   className={['navbar-brand', styles.empty].join(' ')}
//                   onClick={this.resetAnimation}>
//                   <img alt="logo" height="30" width="30" src="./favicon.ico" />
//                 </Link>
//               </div>
//             </nav>
//           </div>
//         )}
//       </Spring>
//     );
//   }
// }

// Navbar.propTypes = {};

// const mapStateToProps = state => ({
//   clientInfo: state.clientInfo,
// });

// export default connect(
//   mapStateToProps,
//   {},
// )(Navbar);
