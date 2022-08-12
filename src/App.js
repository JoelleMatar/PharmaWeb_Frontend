import { BrowserRouter } from 'react-router-dom';
// import Navbar from './components/navbar/Navbar';
import Routing from './routes';
import ThemeConfig from './theme';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import logo from "./assets/logoPharma.png";
import ProductsList from './pages/productsList/ProductsList';

const App = () => {
  function GoToProducts() {
    window.open('http://localhost:3000/home/products', "_blank");
    return <p></p>
  }
  function GoToPharmacies() {
    window.open('http://localhost:3000/home/pharmacies', "_blank");
    return <p></p>
  }
  function GoToRequestDrugs() {
    window.open('http://localhost:3000/home/request-drug', "_blank");
    return <p></p>
  }
  function GoToDonateDrugs() {
    window.open('http://localhost:3000/home/donate-medication', "_blank");
    return <p></p>
  }
  function GoToRegister() {
    window.open('http://localhost:3000/auth/signup', "_blank");
    return <p></p>
  }

  const steps = [
    {
      id: '0',
      message: 'Welcome to PharmaWeb, I am here to help.',
      trigger: '1',
    },
    {
      id: '1',
      user: true,
      trigger: '2',
    },
    {
      id: '2',
      message: 'What are you looking for?',
      trigger: '3'
    },
    {
      id: '3',
      options: [
        { value: 1, label: 'Products', trigger: '4' },
        { value: 2, label: 'Pharmacies', trigger: '5' },
        { value: 3, label: 'Requesting Drugs', trigger: '6' },
        { value: 4, label: 'Donating Drugs', trigger: '7' },
        { value: 5, label: 'Becoming a Member', trigger: '8' },
      ],
      // end: true
    },
    {
      id: '4',
      component: <GoToProducts />,
    },
    {
      id: '5',
      component: <GoToPharmacies />,
    },
    {
      id: '6',
      component: <GoToRequestDrugs />,
    },
    {
      id: '7',
      component: <GoToDonateDrugs />,
    },
    {
      id: '8',
      component: <GoToRegister />,
    },
  ];


  const theme = {
    background: '#00B8B0',
    headerBgColor: '#00B8B0',
    headerFontSize: '20px',
    botBubbleColor: '#00B8B0',
    headerFontColor: 'white',
    botFontColor: '#00B8B0',
    userBubbleColor: '#00B8B0',
    userFontColor: 'white',
  };

  // Set some properties of the bot
  const config = {
    botAvatar: { logo },
    floating: true,
  };

  return (
    <ThemeConfig sx={{ display: 'flex', flexDirection: 'column' }}>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routing />
        {/* <ThemeProvider theme={theme}> */}
          <ChatBot
             background= '#00B8B0'
             headerBgColor= '#00B8B0'
             headerFontSize= '20px'
             botBubbleColor= '#00B8B0'
             headerFontColor= 'white'
             botFontColor= '#00B8B0'
             userBubbleColor= '#00B8B0'
             userFontColor= 'white'
            headerTitle="PharnaWeb Bot"
            steps={steps}
            botAvatar={logo}
            floating={true}
          // {...config}

          />
        {/* </ThemeProvider> */}
      </BrowserRouter>
    </ThemeConfig>

  )
};

export default App;
