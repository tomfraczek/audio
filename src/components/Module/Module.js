// FLOW is A pain here, redo or something ...!
// @flow
/**
 * Module
 *
 * Given a Module ID,
 * Holds all the lessons and tests,
 * users click between each sequentially,
 * the module info and progress are independent
 * of the lessons / tests
 */

import React, {Component} from 'react';
import type {Node} from 'react';
import Page from '../../containers/page/page.js';
import {
  ModuleInformation,
} from './ModulePresentational.js';
import {
  ModuleProgress,
} from './ModuleProgress.js';
import ModuleComponents from '../ModuleComponents/ModuleComponents.js';
import {Redirect} from 'react-router-dom';
import type {
  ResourcesType,
  ModuleFieldsType,
  ModuleComponentType,
  TranslateType,
} from '../../types.js';
import styles from './Module.module.css';
import translate from '../../config/text';

type PropsType = {
  resources: ResourcesType,
  loaded: boolean,
  route: {
    match: {
      params: {
        courseId: string,
        moduleId: string,
      },
    },
  },
  done: string => void,
  language: string,
};

type StateType = {
  visibleModuleComponent: number,
  nextButtonDisabled: boolean,
  completed: boolean,
};

export const ModuleLoader = (props: PropsType): Node => {
  if (!props.loaded) {
    return <div>Loading Module</div>;
  }
  return (
    <Module {...props} />
  );
};

export class Module extends Component<PropsType, StateType> {
  courseId: string;
  resources: ResourcesType;
  moduleData: ModuleFieldsType;
  moduleComponentLength: number;
  completeModule: () => void;
  t: TranslateType
  constructor(props: PropsType) {
    super(props);
    const {route, resources} = props;
    const moduleId = route.match.params.moduleId;
    // $FlowFixMe
    const completeModuleHoF = (id: string): void => (): void => (
      this.props.done(id)
    );
    this.courseId = route.match.params.courseId;
    this.resources = resources;
    this.moduleData = this.resources.modules[moduleId];
    this.moduleComponentLength =
      resources.modules[moduleId].field_add_components.length;
    // $FlowFixMe
    this.completeModule = completeModuleHoF(moduleId);
    // state is only stuff local to Module that can change
    this.state = {
      visibleModuleComponent: 1,
      nextButtonDisabled: false,
      completed: false,
    };
    this.t = translate(this.props.language);
  }
  incrementVisible = () => {
    /* @flow weak */
    if (this.state.visibleModuleComponent < this.moduleComponentLength) {
      // @FlowFixMe
      this.setState((prevState: StateType): any => ({
        visibleModuleComponent: ++prevState.visibleModuleComponent,
      }));
    }
  }
  decrementVisible = () => {
    if (this.state.visibleModuleComponent > 1) {
      this.setState((prevState: StateType): any => ({
        visibleModuleComponent: --prevState.visibleModuleComponent,
      }));
    }
  }
  handleDisableButton = (willDisable: boolean) => {
    if (willDisable !== this.state.nextButtonDisabled) {
      this.setState({
        nextButtonDisabled: willDisable,
      });
    }
  }
  skipToComponent = (componentId: number) => {
    if (componentId <= this.moduleComponentLength) {
      this.setState({
        visibleModuleComponent: componentId,
      });
    }
  }
  completeModuleButton = () => {
    this.completeModule();
    this.setState({
      completed: true,
    });
  }
  render(): * {
    if (!this.moduleData) {
      return <div>Module ID is not found</div>;
    }
    return (
      <Page>
        <ModuleInformation
          courseName={this.resources.courses[this.courseId].title[0].value }
          moduleName={ this.moduleData.title[0].value }
          currentModuleComponent={ this.state.visibleModuleComponent }
          moduleComponentLength={ this.moduleComponentLength } />
        <div className={styles.page}>
          <div className={styles.content}>
            <ModuleComponents
              modulesComponents={this.moduleData.field_add_components}
              allModuleComponents={this.resources.components}
              visibleModuleComponentId={this.state.visibleModuleComponent}
              t={this.t} />
            <ModuleProgress
              state={this.state}
              moduleComponentLength={this.moduleComponentLength}
              update={{
                decrement: this.decrementVisible,
                increment: this.incrementVisible,
                complete: this.completeModuleButton,
              }}
              courseId={this.courseId}
              t={this.t} />
          </div>
          <div className={styles.sidebar}>
            <Sidebar
              components={this.moduleData.field_add_components}
              allModuleComponents={this.resources.components}
              visibleModuleComponentId={this.state.visibleModuleComponent}
              skipToComponent={this.skipToComponent} />
          </div>
        </div>
        {
          // If you hit the complete module button
          this.state.completed && <Redirect
            to={`/course/${this.courseId}`} />
        }
      </Page>
    );
  }
}

type ModuleComponentsType = {
  components: Array<{
    target_id: string,
  }>,
  allModuleComponents: ModuleComponentType,
  visibleModuleComponentId: number,
  skipToComponent: (number) => void,
  children?: void,
};

const Sidebar = ({
  components,
  allModuleComponents,
  visibleModuleComponentId,
  skipToComponent,
}: ModuleComponentsType): Node => (
  <ol className={styles.index}>
    {
      components.map((
        component: {target_id: string},
        i: number
      ): Node => (
        // $FlowFixMe
        <li
          key={i}
          onClick={(): void => skipToComponent(i + 1)}
          style={{
            opacity: visibleModuleComponentId > i + 1 ? 0.5 : 1,
          }}>
        {
          allModuleComponents[
            component.target_id
          ].type[0].target_id === 'lesson'
            // $FlowFixMe
            ? allModuleComponents[component.target_id].field_headline[0].value
            : 'Question'
        }
      </li>
        )
      )
    }
  </ol>
);
