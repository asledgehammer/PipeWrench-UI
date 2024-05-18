/** @jsx PipeWrenchUI.createElement */
/** @noSelfInFile */

import * as Events from '@asledgehammer/pipewrench-events';
import { PipeWrenchUI } from '../../shared/pipewrench-ui/React';
import { HTMLDivElement } from '../../shared/pipewrench-ui/html/elements/HTMLDivElement';
import { createWindow } from '../../shared/pipewrench-ui/PipeWrenchUI';

/**
 * Create and add the element here and to the UIManager.
 */
Events.onMainMenuEnter.addListener(() => {
  const element: HTMLDivElement = (
    <span>Yes</span>
  );

  const ourWindow = createWindow();
  const { document } = ourWindow;
  document.appendChild(element);
});
