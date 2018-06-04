// @flow
/**
 * This components encapsulates a state for the components to use.
 * Receive all the components, create an object
 *
 */

import React from 'react';
import type {Node} from 'react';
import type {
  ModuleComponentType,
  TranslateType,
} from '../../types.js';
import {
  ModuleComponent,
  ModuleComponentVisibility,
} from '../ModuleComponent/ModuleComponent.js';

type ModuleComponentsType = {
  modulesComponents: Array<{
    target_id: string
  }>,
  allModuleComponents: ModuleComponentType,
  visibleModuleComponentId: number,
  t: TranslateType
};

const ModuleComponents = ({
  modulesComponents,
  allModuleComponents,
  visibleModuleComponentId,
  t,
}: ModuleComponentsType): Array<Node> => (
  modulesComponents.map((
    moduleComponent: {
      target_id: string
    },
    i: number
  ): Node => (
      <ModuleComponentVisibility
        key={i}
        isVisible={{
          thisId: i + 1,
          visibleId: visibleModuleComponentId,
        }}>
        <ModuleComponent
          moduleComponent={
            allModuleComponents[moduleComponent.target_id]
          }
          t={t} />
      </ModuleComponentVisibility>
    )
  )
);

export default ModuleComponents;
