// @flow
import React from 'react';
import type {Node} from 'react';
import {Link} from 'react-router-dom';
import style from './Course.module.css';

import type {
  ResourcesType,
  ModuleComponentType,
  // MultiChoiceFieldsType,
  // LessonFieldsType,
  CourseFieldsType,
  ModuleStatusesType,
  TranslateType,
} from '../../types.js';

type CourseModuleElementType = {
  title: string,
  moduleId: string,
  courseId: string,
  moduleComponents: Array<ModuleComponentType | {}>,
  moduleStatus: boolean,
  number: number,
};

const CourseModuleElement = ({
  title,
  courseId,
  moduleId,
  moduleComponents,
  moduleStatus,
  number,
}: CourseModuleElementType): Node => (
  <Link to={`/course/${courseId}/${moduleId}`} className={style.module}>
    <div className={style.moduleTitle}>{number}. {title}</div>
    <div className={style.moduleDone}>{moduleStatus ? '✔' : '✗'}</div>
  </Link>
);

// const ModuleComponentElement = ({
//   field_headline,
// }: { field_headline: Array<{value: string}> | void }): Node => {
//   if (!field_headline) {
//     return <li>Test</li>;
//   }
//   return (
//     <li>
//       {field_headline[0].value}
//     </li>
//   );
// };

type CoursePresentationType = {
  title: Array<{value: string}>,
  field_introduction: Array<{value: string}>,
  t: TranslateType,
};

export const CoursePresentation = ({
  title,
  field_introduction,
  t,
}: CoursePresentationType): Node => (
  <div className={style.introduction}>
    <h2>{t('about')}:</h2>
    <div className={style.about} dangerouslySetInnerHTML={{
      __html: field_introduction[0].value,
    }} />
  </div>
);

type CourseModulesPresentationType = {
  courseData: CourseFieldsType,
  resources: ResourcesType,
  moduleStatuses: ModuleStatusesType,
};

export const CourseModulesPresentation = ({
  courseData,
  resources,
  moduleStatuses,
}: CourseModulesPresentationType
): Node => (
  courseData.field_modules.map((
    module: {target_id: string},
    i: number
  ): Node => {
    return <CourseModuleElement
      key={i}
      title={resources.modules[module.target_id].title[0].value}
      moduleId={module.target_id}
      courseId={courseData.nid[0].value}
      moduleStatus={moduleStatuses[module.target_id]}
      number={i + 1}
      moduleComponents={
        resources.modules[module.target_id].field_add_components.map(
          (component: {target_id: string}): {} | ModuleComponentType =>
            resources.components[component.target_id]
        )
      } />;
    }
  )
);

type CourseAssessmentType = {
  courseId: string,
  completed: boolean,
  courseTitle: string,
  t: TranslateType,
};

export const CourseAssessment = ({
  courseId,
  completed,
  courseTitle,
  t,
}: CourseAssessmentType): Node => (
  <Link className={style.assessment} to={`/course/${courseId}/assessment`}>
    <div className={style.assessmentTitle}>{courseTitle} {t('assessment')}</div>
    <div>{completed ? '✔' : '✗'}</div>
  </Link>
);

const Title = ({title}: {title: string}): Node => <h1>{title}</h1>;

const Progress = ({
  complete,
  total,
}: {complete: number, total: number}): Node => {
  return (
    <div className={style.progress}>
      {parseInt((complete / total) * 100, 10)}% Complete
    </div>
  );
};

export const CourseHeader = ({
  title,
  progress,
}: {
  title: string,
  progress: {
    total: number,
    complete: number,
  },
}): Node => (
  <div className={style.header}>
    <Title title={title} />
    <Progress complete={progress.complete} total={progress.total} />
  </div>
);
