import React, { useEffect, useState } from "react"
import Card from "./Card"

type CardJson={
    id : string,
    img : string,
    imgalt:string,
    desc:string,
    price : number,
    productname :string,
}

interface Props{

}

const CardContainer=({}:Props)=>{
    const [cards,setCards]=useState<CardJson[]>([])

    useEffect(()=>{
        fetch('cards.json')
            .then(res => res.json())
            .then((result) => {
                const cards=result as CardJson[]
                setCards(cards)
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