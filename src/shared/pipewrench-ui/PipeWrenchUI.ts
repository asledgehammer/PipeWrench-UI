import { onFrontEndTick, onMainMenuEnter, onTickEvenPaused } from "@asledgehammer/pipewrench-events";
import { HTMLWindow } from "./html/elements/HTMLWindow";
import { initPZ } from "./html/PZ";

export const windows: HTMLWindow[] = [];

export function createWindow(): HTMLWindow {
  const window = new HTMLWindow();
  windows.push(window);
  return window;
}

onMainMenuEnter.addListener(() => {

  function update() {
    for (let index = 0; index < windows.length; index++) {
      windows[index].update2();
    }
  }

  const renderTable = {
    prerender: function () {
      for (let index = 0; index < windows.length; index++) {
        windows[index].prerender();
      }
    },
    render: function () {
      for (let index = 0; index < windows.length; index++) {
        windows[index].render();
      }
    },
  };

  initPZ(renderTable);

  // (The main menu has a separate tick from in-game)
  onFrontEndTick.addListener(update);
  onTickEvenPaused.addListener(update);

});
