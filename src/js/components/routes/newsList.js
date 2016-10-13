require('./home.less');
import React from 'react';

import { connect } from 'react-redux';
import { actionAjaxGetNewsList } from '../../actions/news';

class NewsList extends React.Component {
  constructor(...args) {
    super(...args);
  }
  componentDidMount() {
    this.props.actionAjaxGetNewsList();
  }
  render() {
    return (
      <ul>
        {this.props.dataNewsList.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    );
  }
}
NewsList.propTypes = {
  actionAjaxGetNewsList: React.PropTypes.func,
  dataNewsList: React.PropTypes.array
};
export default connect(
  state => ({ dataNewsList: state.newsList.dataNewsList }),
  dispatch => ({ actionAjaxGetNewsList: () => actionAjaxGetNewsList(dispatch) })
)(NewsList);
