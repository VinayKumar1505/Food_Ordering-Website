import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  
  let foodItem = props.item;
  let dispatch= useDispatchCart();
  let data = useCart()
  const priceRef= useRef();
   let options= props.options;
   let priceOptions= Object.keys(options)
   const [qty, setQty]= useState(1);
   const [size, setSize]=useState("")

   const handleAddToCart=async ()=>{

   let food= []
   for (const item of data){
    if(item.id === props.foodItem.id){
      food= item;

      break
    }
   }

   if(food.length !== 0){
    if(food.size === size){
      await dispatch({type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty})
       return
    }
    else if(food.size!= size){

      await dispatch({type:"ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
      // console.log(data)
      return
    }
    return
  }
    await dispatch({type:"ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
    
   }
 let finalPrice =qty * parseInt(options[size]);
useEffect(()=>{
  setSize(priceRef.current.value)
},[])

  return (
    <div>
      <div class="card mt-3" style={{width: "19rem", maxheight: "360px" }}>
        <img src={props.foodItem.img} class="card-img-top" alt="..." style={{height:"150px", objectFit:"fill"}}/>
        <div class="card-body">
            <h5 class="card-title"> {props.foodItem.name}</h5>
            <div class="container w-100">
                <select class="m-2 h-100 " style={{color:"#0D0E0E", background: "rgba(51, 255, 167, 0.5)"}} onChange={(e)=> setQty(e.target.value)}>
                   {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
                 })}
                    </select> 
                    <select class="m-2 h-100" style={{color:"#0D0E0E", background: "rgba(51, 255, 167, 0.5)"}} ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                      { priceOptions.map((data)=>{
                             return <option key={data} value={data}>{data}</option>
                       })
                        }
                        </select><div class="d-inline  fs-5">
                        ₹{finalPrice}/-
                          </div>
                        </div>
                 </div>
                 <hr/>
                 <div className='btn justify-center ms-4 mb-2 ' style={{color:"#0D0E0E", marginLeft: 'auto', marginRight: 'auto', justify:"center" ,background: "rgba(51, 255, 167, 0.5)"}} onClick={handleAddToCart}> Add to Cart</div>
         </div>
    </div>
  )
}
