import withRouter from 'umi/withRouter';
import { connect } from 'dva';

function BasicLayout(props) {
  return (
    <div>
      <h2>hello</h2>
      <h3>message from global model: {props.message}</h3>
      <hr />
      {
        props.children
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    message: state.global.message,
  };
}

export default withRouter(connect(mapStateToProps)(BasicLayout));
