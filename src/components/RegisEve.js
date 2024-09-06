import React, { useState } from 'react';
import Swal from 'sweetalert2';
import DatePicker from 'react-multi-date-picker';

const RegisEve = () => {
    const [name, setName] = useState('');
    const [dateTime, setDateTime] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !dateTime.length) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos.',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/NameEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    dateTime,
                }),
            });
            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Formulario enviado correctamente',
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Limpiar los campos después del envío exitoso
                setName('');
                setDateTime([]);

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result.message || 'Error al enviar el formulario',
                });
            }

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error inesperado. Por favor, intenta nuevamente.',
                showConfirmButton: false,
                timer: 1500,
                width: 520,
            });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col'>
                        <div className='inputForm'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                                <line x1="7" y1="9" x2="17" y2="9" />
                                <line x1="7" y1="15" x2="17" y2="15" />
                                <line x1="11" y1="4" x2="11" y2="20" />
                            </svg>
                            <input
                                type='text'
                                className="inputF"
                                id='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='col'>   
                        <div className='inputForm'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="26" height="26">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>
                            <DatePicker
                                multiple
                                value={dateTime}
                                onChange={setDateTime}
                                format="YYYY-MM-DD"
                                className="inputF"
                            />
                        </div>
                    </div>
                    <div className="btn-regis">
                        <button className="CartBtn" type="submit">
                            <span className="IconContainer">
                                <svg
                                    className='iconCalendar'
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 5.05h1a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2h1v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1Zm-15 6v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8H3ZM11 18a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <p className="textoo">Registrar</p>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default RegisEve;
