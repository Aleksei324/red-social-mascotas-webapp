import { useState, Key, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeQuantityCart, removeFromCart, removeAllFromCart, cartInterface } from "../store/userSlice"
import { Footer, Header, Pago, Popup } from "../components"
import { NoItemsInCart } from "./NoItemsInCart"
import { useNavigate } from "react-router-dom"
import '../styles/cart.css'
import '../styles/Login.css'

export const Cart = () => {
  const [getEditarPago, setEditarPago] = useState(false)
  const [getEditarUbicacion, setEditarUbicacion] = useState(false)
  const [getTotal, setTotal] = useState(0)

  const cart = useSelector((state: any) => state.userSlice.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onRemoveAll = () => {
    dispatch(removeAllFromCart())
    navigate('/home')
  }

  useEffect(() => {
    let temp = 0
    for (const item of cart) {
      temp += item.cant * item.ad.price
    }
    setTotal(temp)
  }, [])

  return (
    <div className="onlyFooterG">
      <Header/>
      {
        getTotal > 0 ?
        <>
          <br/><br/><br/><br/>
          <Popup activation={getEditarPago} setActivation={setEditarPago}>
            <Pago tipo='metodoPago'/>
          </Popup>

          <Popup activation={getEditarUbicacion} setActivation={setEditarUbicacion}>
            <Pago tipo='ubicacion'/>
          </Popup>

          <main className="container">
            <div className="row">
              <div className="col-12 col-lg-5">
                <div className="cartSectionPost">
                  <div>
                    <b>Metodo de pago</b>
                    <br/>
                    &bull;&bull;&bull;&bull;
                    &bull;&bull;&bull;&bull;
                    &bull;&bull;&bull;&bull;
                    &bull;&bull;54
                  </div>
                  <button className="yellowButtonCart " onClick={() => setEditarPago(true)}>Editar</button>
                </div>
                <hr/>
                <div className="cartSectionPost ">
                  <div>
                    <b>Ubicación</b>
                    <br/>
                    Diagonal 12 #41-79A
                  </div>

                  <button className="yellowButtonCart" onClick={() => setEditarUbicacion(true)}>Editar</button>
                </div>
                <hr/>
                <div className="cartSectionPost">
                  <span><b>Envío:</b> ${(getTotal * 0.05).toFixed(2)}<br/>
                  <b>Total:</b> ${(getTotal + getTotal * 0.05).toFixed(2)}</span>
                </div>
                <button className="yellowButtonCart fullRedButtonCart" onClick={() => console.log('comprar')}>Comprar</button>
                
              </div>
              <div className="cart col-12 col-lg-7">
                <div>
                  <button className="redButtonCart fullRedButtonCart" onClick={() => onRemoveAll()}>Remover todos los items</button>
                  <div>
                    <div className="componentLogin">
                      {
                        cart.map((item: cartInterface, key: Key) => {
                          return (
                            <div key={key} className="componentG flexG cartItem">
                              <img className="imgItemCart" src={item.ad.pic} alt="Foto del producto" width="100" height= "100" />

                              <div className="itemTextCart">
                                <h3>{item.ad.name}</h3>
                                <p>{item.ad.user.name}</p>
                                <h4><b>${item.ad.price}</b></h4>
                              </div>

                              <div />

                              <div className="cartReduce">
                                <div className="yellowButtonCart">
                                  <button className="cantidadCart" onClick={() => dispatch(changeQuantityCart({ id: item.ad.postID, aumenta: false }))}>-</button>
                                  <span> {item.cant} </span>
                                  <button className="cantidadCart" onClick={() => dispatch(changeQuantityCart({ id: item.ad.postID, aumenta: true }))}>+</button>
                                </div>

                                <button className="redButtonCart" onClick={() => dispatch(removeFromCart(item.ad.postID))}>Remover</button>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>  
            </div>
          </main>
        </>
        :
        <NoItemsInCart />
      }
      <Footer/>
    </div>
  )
}
