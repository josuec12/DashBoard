import React from 'react'

const Register = () => {
  return (
      <div className="wrapper">
          <div className="container mainn">
              <div className="row1">
              <div className="right">
                <div className="input-box">
                  <form action="">
                  <header><h2 className="tittle">Registro</h2></header>
                      <div className="input-field">
                          <input type="text" className="input" id="name" required="" autocomplete="off" placeholder="Josue" />
                          <label for="name">Nombres</label>
                      </div>
                      <div className="input-field">
                          <input type="text" className="input" id="apeliido" required="" autocomplete="off" placeholder="Potter" />
                          <label for="name">Apellidos</label>
                      </div>    
                      <div className="input-field">
                          <input type="number" className="input" id="nit" required="" autocomplete="off" placeholder="965647482" />
                          <label for="nit">Nit</label>
                      </div>
                      <div className="input-field">
                          <input type="password" className="input" id="pass" required="" placeholder="***********"></input>
                          <label for="pass">Contraseña</label>
                      </div>
                      <div className="input-field">
                          <input type="url" className="input" id="ventas" required="" placeholder="https://www.example.com/"></input>
                          <label for="ventas">Link Ventas</label>
                      </div>
                      <div className="input-field">
                          <input type="url" className="input" id="financiero" required="" placeholder="https://www.example.com/"></input>
                          <label for="financiero">Link Financiero</label>
                      </div>
                      <div className="input-field">
                          <button type="submit" className="submit">Registrar</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
      </div>
      </div>
  )
}

export default Register