import React from 'react';

//Dashboard
/*
Pagina de inicio
*/

const Dashboard: React.FC = () => {
    return (
        <div className="container mt-5">
            <div className='row'>
            <div className='col-md-6'>
            <h1>FullStack</h1>
            <p>Prueba Tecnica para desarrollador fullstack</p>
            </div>
            <div className='col-md-6'>
            <img src="/igloolab.jpg"  alt="Descripción" />
            </div>
            </div>
            
        </div>
    );
};

export default Dashboard;