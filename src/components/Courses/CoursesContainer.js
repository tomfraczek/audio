import {connect} from 'react-redux';
import {Courses} from './Courses.js';
import {setCourseStatus} from '../../redux/actions/action-creators.js';

const getCourseStatuses = (coursesStatuses) => {
  return coursesStatuses;
};

const getResources = ({status, data}) => {
  return {
    loaded: status === 'loaded' ? true : false,
    data: data,
  };
};

const mapStateToProps = (state) => ({
  coursesStatuses: getCourseStatuses(state.coursesStatuses),
  resources: getResources(state.resources),
  language: state.status.language,
});

const mapDispatchToProps = (dispatch) => ({
  onClick: (status, course) => {
    dispatch(setCourseStatus({status, course}));
  },
});

const UpdatedCourses = connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);

export default UpdatedCourses;
