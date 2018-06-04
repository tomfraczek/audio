import {connect} from 'react-redux';
import {Course} from './Course.js';
import {setCourseStatus} from '../../redux/actions/action-creators.js';

const getResources = ({status, data}) => {
  return {
    loaded: status === 'loaded' ? true : false,
    data: data,
  };
};

const mapStateToProps = (state) => ({
  moduleStatuses: state.moduleProgression,
  coursesStatuses: state.coursesStatuses,
  assessmentStatuses: state.assessmentStatuses,
  resources: getResources(state.resources),
  status: state.status,
});

const mapDispatchToProps = (dispatch) => ({
  updateCourseStatus: (status, course) => {
    dispatch(setCourseStatus({status, course}));
  },
});

const CourseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Course);

export default CourseContainer;
