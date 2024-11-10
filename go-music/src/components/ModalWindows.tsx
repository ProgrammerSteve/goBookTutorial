

import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CreditCardInformation from './CreditCards';

interface Props{
    showModal:boolean;
    toggle:()=>void;
}

export function BuyModalWindow({showModal,toggle}:Props){
    

  
    return (
        <Modal id="buy" tabIndex={-1} role="dialog"
isOpen={showModal} toggle={toggle}>
           <div role="document">
               <ModalHeader toggle={toggle} className="bg-success
text-white">
                   Buy Item
               </ModalHeader>
               <ModalBody>
                     {/*Credit card form*/}
                     <CreditCardInformation operation='Charge' separator={false} show={true}/>
               </ModalBody>
           </div>
       </Modal>
       );
}