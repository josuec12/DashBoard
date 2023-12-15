import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditModal from '../components/EditModal';
import NavA from '../components/NavA';
import NavSideA from '../components/NavSideA';
import React, { useState } from 'react'
import NavSideA from '../components/NavSideA'
import Nav from '../components/Nav';
import User from '../components/User';
import Edit from '../components/Edit';
import AddU from '../components/AddU';

const MySwal = withReactContent(Swal);

const Tabla = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [editingRegistro, setEditingRegistro] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const registrosPorPagina = 4;
  const paginasVisitadas = pageNumber * registrosPorPagina;

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Besitz');

        const newRegistros = response.data.docs || [];

        setRegistros(newRegistros);
      } catch (error) {
        console.error('Error al obtener datos del servidor', error);
      }
    };

    fetchData();
  }, []);

  const handleEditar = (id) => {
    const registro = registros.find((r) => r._id === id);
    setEditingRegistro(registro);

    MySwal.fire({
      title: 'Editar Registro',
      html: <EditModal registro={registro} onSave={handleGuardarEdicion} />,
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  const handleGuardarEdicion = async (editedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/Besitz/${editedData._id}`, editedData);
      const updatedRegistro = response.data.data;
      console.log('Registro Editado:', updatedRegistro);

      const updatedRegistros = registros.map((r) => (r._id === updatedRegistro._id ? updatedRegistro : r));
      setRegistros(updatedRegistros);

      MySwal.close();
      MySwal.fire('¡Éxito!', 'Registro editado correctamente', 'success');
    } catch (error) {
      console.error('Error al editar el registro', error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmacion = await MySwal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmacion.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:5000/Besitz/${id}`);
        console.log('Registro Eliminado:', response.data.data);

        const updatedRegistros = registros.filter((registro) => registro._id !== id);
        setRegistros(updatedRegistros);

        MySwal.fire('¡Éxito!', 'Registro eliminado correctamente', 'success');
      } catch (error) {
        console.error('Error al eliminar el registro', error);
      }
    }
  };

  const pageCount = Math.ceil(registros.length / registrosPorPagina);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0);
  };

  const searchMatches = (registro, term) => {
    const lowerCaseTerm = term.toLowerCase();
    const nitAsString = registro.nit.toString(); 

    return ( 
    registro.nombre.toLowerCase().includes(lowerCaseTerm) ||
    registro.apellido.toLowerCase().includes(lowerCaseTerm) ||
    registro.email.toLowerCase().includes(lowerCaseTerm) ||
    nitAsString.includes(lowerCaseTerm)
    )
  };

  const filteredRegistros = registros.filter((registro) => searchMatches(registro, searchTerm));

  return (
    <div className="body">
      <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />
      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <NavA isOpen={isSidebarOpen} toggleSidebar={toggle} />
        <div className="content">
          <div className="dash">
            <div className='card shadow'>
            <div className="cardHeader">
              <h2>Registros Clientes</h2>
            </div>
              <div className='psearch'>
            <div className="container-inputS">              
                <input type="text" placeholder="Buscar..." name="text" className="inputS" value={searchTerm}
                  onChange={handleSearch} />
                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                  <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fillRule="evenodd"></path>
                </svg>
              </div> 
              </div>
              <br></br>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead className=''>
                    <tr>
                      <th>NOMBRE</th>
                      <th>APELLIDO</th>
                      <th>NIT</th>
                      <th>CONTRASEÑA</th>
                      <th>EMAIL</th>
                      <th>VENTAS</th>
                      <th>FINANCIERO</th>
                      <th>BOLETIN</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registros && registros.length > 0 ? (
                      filteredRegistros.slice(paginasVisitadas, paginasVisitadas + registrosPorPagina).map((registro) => (
                        <tr key={registro._id}>
                          <td>{registro.nombre}</td>
                          <td>{registro.apellido}</td>
                          <td>{registro.nit}</td>
                          <td>{registro.pass}</td>
                          <td>{registro.email}</td>
                          <td>{registro.ventas}</td>
                          <td>{registro.financiero}</td>
                          <td>
                            <a href={`http://localhost:5000/${registro.boletin}`} target="_blank" rel="noopener noreferrer" >
                              <button className="buttonBol">
                                <span>
                                  <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path></svg>
                                </span>
                              </button>
                            </a>
                          </td>
                          <td>
                            <button className="edit-button" onClick={() => handleEditar(registro._id)}>
                              <svg className="edit-svgIcon" viewBox="0 0 512 512">
                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                              </svg>
                            </button>
                            <button className="button-delete" onClick={() => handleEliminar(registro._id)}>
                              <svg viewBox="0 0 448 512" className="svgIcon-D"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">No hay registros disponibles</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Paginación */}
                <div className="clearfix">
                  <div className="hint-text">{`Showing ${paginasVisitadas + 1} to ${paginasVisitadas + registrosPorPagina > registros.length
                    ? registros.length
                    : paginasVisitadas + registrosPorPagina
                    } of ${registros.length} entries`}</div>
                  <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'pagination justify-content-end'} /* Alinea la paginación a la derecha */
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    disabledClassName={'disabled'}
                    activeClassName={'active'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div>
      <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />
        <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
      <Nav isOpen={isSidebarOpen} toggleSidebar={toggle}/>
    <div className="content" >
        <div className="dash">
            <User/>
            <AddU/>
            <Edit/>
            </div>
            </div>
    </div>
    </div>
    </div>
  );
};

export default Tabla;
