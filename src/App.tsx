import React from 'react';
import {Route, Routes} from "react-router-dom";
import Tasks from "./containers/Tasks/Tasks";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={(
          <Tasks/>
        )}/>
      </Routes>
    </>
  );
}

export default App;
