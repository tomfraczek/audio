// @flow
import React from 'react';
import type {Node} from 'react';
import Page from '../../containers/page/page.js';
import {Link} from 'react-router-dom';

const Home = (): Node => (
  <Page title={'Home'}>
    <Link to={`/courses`}>Courses</Link>
    <br/>
    <Progress />
    <br/>
    <br/>
  </Page>
);

const Progress = (): Node => (
  <div>
    <h4>Progress</h4>
    If user has started course will show here.<br/>
    It will show progress as a percentage.<br/>
    If user has not started a course, will be blank or something
  </div>
);

export default Home;
