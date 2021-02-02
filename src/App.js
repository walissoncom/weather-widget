import Form from './components/Form/Form';
import Widget from './components/Widget/Widget';
import './App.css';

/* Main Component */
function App() {
  return (
    <div className="app">

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
    </div>
  );
}

export default App;
