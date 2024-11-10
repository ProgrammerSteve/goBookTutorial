import React, {useState,useEffect} from "react";


type CardJson={
    id : string,
    img : string,
    imgalt:string,
    desc:string,
    price : number,
    productname :string,
}

interface CardProps{
    id:string;
    img:string;
    imgalt:string;
    productname:string;
    desc:string;
    price:number;
    promo:boolean;
    promotion?:number;
    showBuyModal:(id:string,sellPrice:number)=>void;
}

interface ContainerProps{
    promo:boolean;
    location:string;
    showBuyModal:(id:string,sellPrice:number)=>void;
}

const Card =({id,img,imgalt,desc,price,productname,promo,promotion,showBuyModal}:CardProps)=> {

    const priceColor = (promo)? "text-danger" : "text-dark";
    const sellPrice = (promo)?(promotion||0.0):price;
    return (
        <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
            <div className="card mb-3">
                <img className="card-img-top" src={img} alt={imgalt} />
                <div className="card-body">
                    <h4 className="card-title">{productname}</h4>
                    Price: <strong className={priceColor}>{sellPrice}</strong>
                    <p className="card-text">{desc}</p>
                    <a className="btn btn-success text-white" onClick={()=>{showBuyModal(id,sellPrice)}}>Buy</a>
                </div>
            </div>
        </div>
    );
}

const CardContainer=({promo, showBuyModal,location="cards.json"}:ContainerProps)=>{
    const [cards,setCards]=useState<CardJson[]>([])

    useEffect(()=>{
        fetch(location)
            .then(res => res.json())
            .then((result) => {
                const cards=result as CardJson[]
                setCards(cards)
            });
    },[])

    let items = cards.map(
        card => <Card key={card.id} {...card} promo={promo} showBuyModal={showBuyModal}/>
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