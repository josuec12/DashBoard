import React from 'react'

const Tabla = () => {
  return (
    <div className="main">
      <div className="topbar">
        <div className="toggle">
            <ion-icon name="menu-outline"></ion-icon>
        </div>
    </div>
    <div className="content" >
        <div className="card">
        <h2>Tabla</h2>
            <main>
            <table class="table table-striped table-bordered table-primary">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombres</th>
      <th scope="col">Apellidos</th>
      <th scope="col">Nit</th>
      <th scope="col">Contraseña</th>
      <th scope="col">RVentas</th>
      <th scope="col">RFinanciero</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Josue David</td>
      <td>Crespo Vidal</td>
      <td>986465481</td>
      <td>Crespo12.</td>
      <td>https://www.example.com/</td>
      <td>https://www.example.com/</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
            </main>
            </div>
            </div>
    </div>
  )
}

export default Tabla
