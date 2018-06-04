// @flow
import React from 'react';
import type {Node} from 'react';
import {CourseStatuses} from '../../redux/actions/action-types.js';
import Page from '../../containers/page/page.js';
import {Link} from 'react-router-dom';
import type {StatusType, CourseType, TranslateType} from '../../types.js';
import {Loading} from '../';
import courseImg from '../../assets/edge-course.jpg';
import styles from './Courses.module.css';
import translate from '../../config/text';

type CourseButtonType = {
  title: string,
  id: string,
  status: string,
  onClick: () => void,
  t: TranslateType,
};

export const CourseButton = ({
  title,
  id,
  status,
  onClick,
  t,
}: CourseButtonType): Node => {
  // TODO: sucks, should have a HOF to encapsulate this issue
  // only add onClick if course hasn't been started
  return (
    status !== CourseStatuses.NOT_STARTED
      ? <Link className={styles.link} to={`/course/${id}`}>
          <CourseLayout {...{title, status, t}} />
        </Link>
      : <Link
          className={styles.link}
          to={`/course/${id}`}
          onClick={onClick}
        >
        <CourseLayout {...{title, status, t}} />
      </Link>
  );
};

type CourseLayoutType = {
  title: string,
  status: string,
  t: TranslateType,
};

const CourseLayout = (props: CourseLayoutType): Node => (
  <div className={styles.course}>
    <div
      className={styles.image}
      style={{backgroundImage: `url(${courseImg}`}}>
    </div>
    <div className={styles.content}>
      <h2>{props.title}</h2>
      {
        props.status !== CourseStatuses.COMPLETED
          ? <button>{props.t('takeCourse')}</button>
          : props.t('courseComplete')
      }
    </div>
  </div>
);

type CourseListType = {
  courses: CourseType,
  coursesStatuses: {
    [id: string]: StatusType,
  },
  onClick: (string, string) => void,
  t: TranslateType,
};

const CourseList = ({
  courses,
  coursesStatuses,
  onClick,
  t,
}: CourseListType): Array<Node> => {
  return (
    Object.keys(courses).map((key: string, index: number): Node =>
      <CourseButton
        key={index}
        title={courses[key].title[0].value}
        id={courses[key].nid[0].value}
        status={
          coursesStatuses[key]
          ? coursesStatuses[key]
          : coursesStatuses[key] = CourseStatuses.NOT_STARTED
        }
        onClick={(): void => onClick(
          CourseStatuses.STARTED, courses[key].nid[0].value
        )}
        t={t} />
    )
  );
};

type CoursesType = {
  coursesStatuses: {
    [id: string]: StatusType,
  },
  onClick: () => void,
  resources: {
    data: {
      courses: CourseType,
    },
    loaded: boolean,
  },
  language: string,
};

// coursesStatuses is mapped from state by the CoursesContainer
// gets the latest version
export const Courses = ({
  coursesStatuses,
  onClick,
  resources,
  language,
}: CoursesType): Node => {
  if (!resources.loaded) {
    return <Loading text={'Loading courses'} />;
  }
  const t = translate(language);
  return (
    <Page title={'Choose a course'}>
      <div>
        <CourseList
          courses={resources.data.courses}
          coursesStatuses={coursesStatuses}
          onClick={onClick}
          t={t} />
      </div>
    </Page>
  );
};

