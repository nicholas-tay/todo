import "./MainSection.css";
import Cat from "./Cat.js";
import Card from "./Card.js";
import {useState, useEffect} from "react";
import {ethers} from "ethers";

// ABI files allows abilitity to interact with a blockchain
import ABI from "./contractABI.json";

function MainSection() {
  // Wk6: L4 
    // const [count, setCount] = useState(0);
    // function increase () {
    //     setCount(prevCount => prevCount+1)
    // }
    // function decrease () {
    //     setCount(prevCount => prevCount-1)
    // }
    const [currentAccount, setCurrentAccount] = useState(null);
    const [chainName, setChainName] = useState(null);
    // Create an Array for the tasks

    const [task,setTask] = useState([]);

    const [input, setInput] = useState(null);

    const change = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract('0x8BE8A0752b402972135099d6e883d2E59583729F', ABI, signer);

      const createTask = await contract.createTask(input);

      // const changeAge = await contract.changeAge(30);
      // can parse multiple variables to the contract eg. contract.changeName(input, 26)

      // #Wk6-D2 Stuff
      // const changeName = await contract.changeName(input);
      // const receipt = await changeName.wait();
      // console.log(receipt); // can get the receipt which is a bunch of info about the transaction
    }

    // 3 lines of code to setup the contract

    const getData = async () => {
      // within this function can use contract
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract('0x8BE8A0752b402972135099d6e883d2E59583729F', ABI, signer);

      const total = await contract.totalTasks();
      console.log(total);

      setTask([]);

      for (var i = 0; i < total; i++) {
        const currentTask = await contract.taskList(i);
        // console.log(currentTask.taskName);
        setTask(prevTask => [...prevTask, currentTask]);
      }


    }


    const getWalletAddress = async () => {
      console.log("hey its working");
      if (window.ethereum && window.ethereum.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts");
        const currentAddress = await provider.getSigner().getAddress();
        console.log(currentAddress);
        setCurrentAccount(currentAddress)

        const chain = await provider.getNetwork();
        setChainName(chain.name);

        const signer = provider.getSigner();
        const contract = new ethers.Contract('0x8BE8A0752b402972135099d6e883d2E59583729F', ABI, signer);

        const total = await contract.totalTasks();
        console.log(total);

        for (var i = 0; i < total; i++) {
          const currentTask = await contract.taskList(i);
          console.log(currentTask.taskName);
        }
  
        

      }

    }
    const chainChanged = () => {
      window.location.reload();
    }
    window.ethereum.on('chainChanged', chainChanged);
    window.ethereum.on('accountsChanged', getWalletAddress);

    useEffect(() => {
      getWalletAddress();
      getData();
    }, []);

    return (
      <div class = "MainSection">
        <div class = "Content">  
            <button onClick = {getWalletAddress}> Connect </button>
            <p> {currentAccount} </p>
            <p> Chain Name: {chainName} </p>
            <input value = {input} onInput= {e => setInput(e.target.value)} />
            <button onClick = {change} > Add Task </button>

            {task.map((item) => (
              <Card Name={item.taskName} id={item.id}  done={item.completedYet} />
              ))}
        </div>
        <div class = "Sidebar">
            <Cat id = "300" name = "Bob" />
            <Cat id = "301" name = "Alice" />
            <Cat id = "302" name = "Peter" />
        </div>
      </div>
    );
  }
  
  export default MainSection;
  