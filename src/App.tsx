import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Header } from './ui/common/components/header';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </>
  );
}

export default App;
