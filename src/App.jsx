import React from "react";
import { useMachine } from "@xstate/react";
import { STATES, playerMachine } from "./player.machine";

const renderMap = {
  [STATES.PLAY.status]: <p>Rockin'!</p>,
  [STATES.STOP.status]: <p>Play some music.</p>,
  [STATES.PAUSE.status]: <p>Waiting to resume</p>,
};

function App() {
  const [current, send] = useMachine(playerMachine);

  function triggerChange(nextState) {
    send(nextState.action);
  }

  return (
    <>
      <p>Current state: {current.value} </p>
      <button onClick={() => triggerChange(STATES.PLAY)}>Play</button>
      <button onClick={() => triggerChange(STATES.STOP)}>Stop</button>
      <button onClick={() => triggerChange(STATES.PAUSE)}>Pause</button>
      {renderMap[current.value]}
    </>
  );
}

export default App;
