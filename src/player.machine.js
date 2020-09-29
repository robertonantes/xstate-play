import { Machine } from "xstate";

export const STATES = {
  STOP: {
    action: "STOP",
    status: "stopped",
  },
  PLAY: {
    action: "PLAY",
    status: "playing",
  },
  PAUSE: {
    action: "PAUSE",
    status: "paused",
  },
};

function getStateObj(state) {
  return { [state.action]: state.status };
}

export const playerMachine = Machine({
  id: "player",
  initial: STATES.STOP.status,
  states: {
    playing: {
      on: { ...getStateObj(STATES.STOP), ...getStateObj(STATES.PAUSE) },
    },
    stopped: {
      on: { ...getStateObj(STATES.PLAY) },
    },
    paused: {
      on: { ...getStateObj(STATES.PLAY), ...getStateObj(STATES.STOP) },
    },
  },
});
