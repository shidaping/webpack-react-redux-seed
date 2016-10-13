require('./main.less');
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router';
// export default function Main({ children }) {
//   return (
//     <div>
//       <div className="main-header"></div>
//       <div className="main-body">{children}</div>
//       <div className="main-footer">
//         <Link to="/">Home</Link>
//         <Link to="/newsList">NewsList</Link>
//       </div>
//     </div>
//   );
// }
export default class Main extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {transition: 'example'};
  }
  componentDidMount() {
    let self = this;
  }
  componentWillReceiveProps(nextProps) {
    const thisIndex = this.props.children.props.route.index;
    const nextIndex = nextProps.children.props.route.index;
    const transition = nextIndex - thisIndex > 0 ? 'example' : 'example2';
    this.setState({ transition });
  }


  render() {
    return (
      <div>
        <div className="main-header"></div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName={this.state.transition}
          transitionEnterTimeout={0}
          transitionLeaveTimeout={0}
        >
          {React.cloneElement(this.props.children, {
            key: this.props.location.pathname
          })}
        </ReactCSSTransitionGroup>
        <div className="main-footer">
          <Link to="/">Home</Link>
          <Link to="/newsList">NewsList</Link>
        </div>
      </div>
    );
  }
}
Main.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.any
};

