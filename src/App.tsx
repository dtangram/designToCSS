import React from "react";
import DesignProvider from "./context/DesignContext";
import MainContent from "./components/MainContent";

const App = () => {
  return (
    <DesignProvider>
      <MainContent />
    </DesignProvider>
  );
}

export default App;
