import logo from './logo.svg';
import './App.css';
import Header from './header.js';
import './header.css';
import MainSection from './MainSection.js';
import Footer from './Footer.js';

function App() {
  return (
    <div className="App">
      <p> This is a simple ToDoList Dapp</p>
      <p> ToDoList Dapp Still WIP and links may not work </p>
      <p> Connect to Metamask, use Goerli Testnet to begin </p>
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
}

export default App;
