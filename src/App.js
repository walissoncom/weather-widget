import React from 'react';
import Form from './components/Form/Form';
import Widget from './components/Widget/Widget';
import { useDataLayerValue } from './DataLayerContext';
import { actionTypes } from './reducer';
import { motion } from 'framer-motion';
import './App.css';

/* Main Component */
function App() {

  /* Data Layer Context - Used to read and add data */
  const [{ darkMode }, dispatch] = useDataLayerValue();

  /* Dispatch the Dark Mode status to the Data Layer */
  const handleDarkModeValue = (e) => {
    let darkMode = e.currentTarget.checked;
    dispatch({ type: actionTypes.SET_DARK_MODE, darkMode });
  }

  return (
    <div className={!darkMode ? 'app' : 'app dark'}>

      {/* Editor - Form component */}
      <div className="editor">
        <Form />
      </div>

      {/* Separator */}
      <div className="line"></div>

      {/* Visual - Widget component */}
      <div className="visual">
        <Widget />
      </div>

      {/* Dark Mode - Theme selection */}
      <motion.div className="mode"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .5 }}>

        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={handleDarkModeValue} />
          <span className="slider round"></span>
        </label>
      </motion.div>
    </div>
  );
}

export default App;
