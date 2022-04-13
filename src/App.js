import { BrowserRouter } from 'react-router-dom';
import Routing from './routes';
import ThemeConfig from './theme';

const App = () => {
  return (
    <ThemeConfig>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ThemeConfig>

  )
};

export default App;
