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
                                            <td>{registro.userType}</td>
                                            <td>{registro.hostname}</td>
                                            <td>{registro.ipAddress}</td>
                                            <td>{registro.tiempo}</td>
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
