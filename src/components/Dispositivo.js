import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Dispositivo = () => {

    const [registros, setRegistros] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);

    const registrosPorPagina = 4;
    const paginasVisitadas = pageNumber * registrosPorPagina;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Auth');

                const newRegistros = response.data.docs || [];

                setRegistros(newRegistros);
            } catch (error) {
                console.error('Error al obtener datos del servidor', error);
            }
        };

        fetchData();
    }, []);

    const pageCount = Math.ceil(registros.length / registrosPorPagina);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };

    const searchMatches = (registro, term) => {

        if (!term) {
            return true;
        }

        const lowerCaseTerm = term.toLowerCase();
        const palabraClave = lowerCaseTerm.split(' ')

        const matches = palabraClave.map(palabra => {
            return (
                registro.userNom.toLowerCase() === palabra ||
                registro.userType.toLowerCase() === palabra ||
                registro.hostname.toLowerCase() === palabra ||
                registro.ipAddress.toLowerCase() === palabra ||
                registro.tiempo.toLowerCase() === palabra
            )
        })
        return matches.every(match => match === true);
    };

    const filteredRegistros = registros.filter((registro) => searchMatches(registro, searchTerm));

    return (
        <>
            <div className='card shadow '>
                <div className='cardHeader'>
                    <h2>DISPOSITIVO</h2>
                </div>
                <div className='psearch'>
                    <div className="groupS">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="iconSS">
                            <g>
                                <path
                                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                                ></path>
                            </g>
                        </svg>
                        <input className="inputSS" type="search" placeholder="Search" value={searchTerm}
                            onChange={handleSearch} />
                    </div>
                </div>
                <br />
                <div className='table-responsive'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Tipo User</th>
                                <th>Dispositivo</th>
                                <th>Ubicacion</th>
                                <th>Actividad Reciente</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registros && registros.length > 0 ? (
                                filteredRegistros.length > 0 ? (
                                    filteredRegistros.slice(paginasVisitadas, paginasVisitadas + registrosPorPagina).map((registro) => (
                                        <tr key={registro._id}>
                                            <td>{registro.userNom}</td>
                                            <td>{registro.userType === 'Admin' ? <span className='typeUser'><svg className="w-6 h-6 text-gray-800 dark:text-white" width="26" height="26" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.1 1.9-.7-.7m5.6 5.6-.7-.7m-4.2 0-.7.7m5.6-5.6-.7.7M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>Admin</span>
                                                : <span className='typeUser'><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>User</span>
                                            }</td>
                                            <td><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z" />
                                            </svg>
                                                {registro.hostname}</td>
                                            <td>
                                                <svg
                                                    version="1.1"
                                                    id="Layer_1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    x="0px"
                                                    y="0px"
                                                    width="25"
                                                    height="25"
                                                    viewBox="0 0 64 64"
                                                    enableBackground="new 0 0 64 64"
                                                    xmlSpace="preserve"
                                                >
                                                    <path
                                                        fill="none"
                                                        stroke="#000000"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M32.001,0.887c17.184,0,31.113,13.929,31.112,31.113
	C63.114,49.185,49.184,63.115,32,63.113C14.815,63.114,0.887,49.185,0.888,32.001C0.885,14.816,14.815,0.887,32.001,0.887z"
                                                    ></path>
                                                    <line
                                                        fill="none"
                                                        stroke="#000000"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        x1="32"
                                                        y1="1"
                                                        x2="32"
                                                        y2="63"
                                                    ></line>
                                                    <line
                                                        fill="none"
                                                        stroke="#000000"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        x1="63"
                                                        y1="32"
                                                        x2="1"
                                                        y2="32"
                                                    ></line>
                                                    <path
                                                        fill="none"
                                                        stroke="#000000"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M30,1c0,0-14,11-14,31s14,31,14,31"
                                                    ></path>
                                                    <path
                                                        fill="none"
                                                        stroke="#000000"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M34,1c0,0,14,11,14,31S34,63,34,63"
                                                    ></path>
                                                    <path
                                                        fill="none"
                                                        stroke="#000000"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8,12c0,0,5,10,24,10s24-10,24-10"
                                                    ></path>
                                                    <path
                                                        fill="none"
                                                        stroke="#000000"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8,52c0,0,5-10,24-10s24,10,24,10"
                                                    ></path>
                                                </svg>
                                                {registro.ipAddress}</td>
                                            <td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> {registro.tiempo}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8"><div className="terminal-loader">
                                            <div className="terminal-header">
                                                <div className="terminal-title">Status</div>
                                                <div className="terminal-controls">
                                                    <div className="control close"></div>
                                                    <div className="control minimize"></div>
                                                    <div className="control maximize"></div>
                                                </div>
                                            </div>
                                            <div className="text">No hay registros encontrados...</div>
                                        </div>
                                        </td>
                                    </tr>
                                )
                            ) : (
                                <tr>
                                    <td colSpan="8"><div className="terminal-loader">
                                        <div className="terminal-header">
                                            <div className="terminal-title">Status</div>
                                            <div className="terminal-controls">
                                                <div className="control close"></div>
                                                <div className="control minimize"></div>
                                                <div className="control maximize"></div>
                                            </div>
                                        </div>
                                        <div className="text">No hay registros disponibles...</div>
                                    </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
                            containerClassName={'pagination justify-content-end'}
                            previousLinkClassName={'page-link'}
                            nextLinkClassName={'page-link'}
                            disabledClassName={'disabled'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dispositivo
