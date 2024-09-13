import React, { useState } from 'react';
import ProductCard from './Components/ProductCard'

const productos = [
  { id: 1, nombre: 'hamburguesa', precio: 8000, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQewdvz0HQg1CNrO1U2TTbBfyzw5d9CIINWpw&s' },
  { id: 2, nombre: 'salchipapa', precio: 10000, imagen: 'https://i.ytimg.com/vi/vlo3cRtybbQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA6w8Ydb4SYliuFUYLWyTaIGcz6sA' },
  { id: 3, nombre: 'perro caliente', precio: 5000, imagen: 'https://img.freepik.com/foto-gratis/hot-dog-ternera-parrilla-snack-ketchup-ia-generativa_188544-7829.jpg' },
  { id: 4, nombre: 'alitasBqq', precio: 13000, imagen: 'https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco/ALITAS-SALSA-1024X1024-px.jpg'}
];

const TiendaVirtual = () => {
  const [carrito, setCarrito] = useState([]);
  const [search, setSearch] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const vaciarCarrito = () =>{
    setCarrito([])
  }

  const eliminarProducto = (productId) => {
    const index = carrito.findIndex(item => item.id === productId);
    if(index !== -1){
      const newCar = [...carrito]
      newCar.splice(index, 1)
      setCarrito(newCar)
    }
  };


  const filter = productos.filter((producto)=> producto.nombre.toLowerCase().includes(search.toLowerCase()) )
  console.log(filter)

  return (
    <div className="container">
      <h1>Mi Tienda Virtual De Comidas rapidas</h1>
      
      <input type="text" onChange={(e)=>setSearch(e.target.value)} />



      <div className="productos-grid">
        
        { filter.length>0? filter.map((producto) => (
          <ProductCard 
            key={producto.id} 
            producto={producto} 
            onAgregarAlCarrito={agregarAlCarrito}
          />
        )):(<p>No se encuentra registro </p>)}
      </div>
      
      <div className="carrito">
        <h2>Carrito</h2>
        <div className="boton-agregar">
          <p>{carrito.length} artículos</p>
          <button onClick={() => vaciarCarrito()}>Vaciar carrito</button>
        </div>
        <ul className="mt-2">
          {carrito.map((item, index) => (
            <div key={index} className="carrito-item ">
              <img 
                src={item.imagen} 
                alt={item.nombre} 
                className="carrito-item-imagen"
              />
              <span>{item.nombre} - ${item.precio}</span>
              <button onClick={()=> eliminarProducto(item.id)}>X</button>
            </div>
          ))}
        </ul>
        <p className="carrito-total">
          Total: ${carrito.reduce((sum, item) => sum + item.precio, 0)}
          <button>Ir a Pagar</button>
        </p>
      </div>
    </div>
  );
};

export default TiendaVirtual;