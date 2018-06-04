// @flow
/**
 * Shows a lesson
 */

import React from 'react';
import type {Node} from 'react';
import styles from './lesson.module.css';
import YouTube from 'react-youtube';

type LessonFieldsType = {
  field_headline: Array<{
    value: string,
  }>,
  field_body: Array<{
    value: string,
  }>,
  field_image: Array<{
    alt: string,
    url: string,
  }>,
  field_youtube_id: Array<{
    value: string,
  }>,
};

export const Lesson = ({
  field_headline,
  field_body,
  field_image,
  field_youtube_id,
}: LessonFieldsType): Node => (
  <div className="lesson">
    <h3>{field_headline[0].value}</h3>
    {
      field_image.length > 0 && <img
        className={styles.img}
        src={field_image[0].url}
        alt={field_image[0].alt} />
    }
    {
      /*
      * dangerouslySetInnerHTML is React's equivilant for .innerHTML
      * https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
      */
    }
    {
      field_body.length > 0 && (
        <div dangerouslySetInnerHTML={{
          __html: field_body[0].value,
        }} />
      )
    }
    {
      field_youtube_id.length > 0 && (
        <div className={styles.video}>
          <YouTube videoId={field_youtube_id[0].value} />
        </div>
      )
    }
  </div>
);
