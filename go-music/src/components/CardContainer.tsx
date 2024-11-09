import React, { useEffect, useState } from "react"
import Card from "./Card"
interface Props{

}

const CardContainer=({}:Props)=>{
    const [cards,setCards]=useState<any[]>([])

    useEffect(()=>{
        console.log('Component Did Mount Called: ' + new Date().toLocaleString());
        fetch('cards.json')
            .then(res => res.json())
            .then((result) => {
                console.log('Fetch...');
                setCards(result)
            });
    },[])


    let items = cards.map(
        card => <Card key={card.id} {...card} />
    );
    

    return (
        <div className='container pt-4'>
            <h3 className='text-center text-primary'>Products</h3>
            <div className="pt-4 row">
                {items}
            </div>
        </div>
    );
}
export default CardContainer