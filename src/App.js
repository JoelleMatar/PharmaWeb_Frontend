import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Routing from './routes';
import ThemeConfig from './theme';

const App = () => {
  return (
    <ThemeConfig>
      <BrowserRouter>
      <Navbar />
        <Routing />
      </BrowserRouter>
    </ThemeConfig>

  )
};

export default App;
