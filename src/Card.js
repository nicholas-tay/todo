import "./Card.css";
import {useState} from "react";
import ABI from "./contractABI.json";
import {ethers} from "ethers";

function Card(prop) {

    const [checked, setChecked] = useState(prop.done)

    const toggle = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract('0x63C3250e5244b58c87458375B05a8421EC7c89de', ABI, signer);

        const toggleContract = await contract.toggleTask(prop.id);

        const receipt = await toggleContract.wait();
        if (receipt.confirmations > 0) {
          //if we have more than 0 confirmations...
            setChecked(!checked);
            //set the check box to the opposite of what the checkbox currently is
        }


    }


    return (
      <div className = "ToDoItem" >
        <p> {prop.Name} </p>
        <input onClick = {toggle} type="checkbox" checked = {checked} />
      </div>
    );
  }
  
  export default Card;
  