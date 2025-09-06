// ✅ Optimal - Less code, more readable, and efficient

import { useState } from "react";

const useStateReducer = (states) => {
  const [state, setState] = useState(states);

  const handleStateChange = (change) => {
    setState((prev) => ({ ...prev, ...change }));
  };

  return { state, setState: handleStateChange };
};

export default useStateReducer;
