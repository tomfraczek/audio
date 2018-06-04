import {connect} from 'react-redux';
import {AssessmentLoader} from './Assessment';
import {assessmentDone} from '../../redux/actions/action-creators.js';

const getAssessmentProgression = (assessmentStatuses) =>
  assessmentStatuses;

const mapStateToProps = (state) => ({
  assessmentStatuses: getAssessmentProgression(state.assessmentStatuses),
  resources: state.resources.data,
  loaded: state.resources.status === 'loaded' ? true : false,
  language: state.status.language,
});

const mapDispatchToProps = (dispatch) => ({
  done: (id) => {
    dispatch(assessmentDone(id));
  },
});

const AssessmentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssessmentLoader);

export default AssessmentContainer;
