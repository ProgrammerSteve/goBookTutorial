import React from 'react'

interface Props{
    img:string;
    imgalt:string;
    productname:string;
    desc:string;
    price:number;
}

const Card =({img,imgalt,desc,price,productname}:Props)=> {
    return (
        <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
            <div className="card mb-3">
                <img className="card-img-top" src={img} alt={imgalt} />
                <div className="card-body">
                    <h4 className="card-title">{productname}</h4>
                    Price: <strong>{price}</strong>
                    <p className="card-text">{desc}</p>
                    <a href="#" className="btn btn-primary">Buy</a>
                </div>
            </div>
        </div>
    );
}

export default Card