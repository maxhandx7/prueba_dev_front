import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

//AddProduct
/*
Componente para agregar un producto
*/


const API_URL = process.env.REACT_APP_API_URL;

const AddProduct: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !description || !price) {
            Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        try {
            await axios.post(`${API_URL}/api/products`, {
                name,
                description,
                price: parseFloat(price),
            });
            Swal.fire('Éxito', 'Producto agregado correctamente', 'success');
            navigate('/admin/products');
        } catch (error) {
            Swal.fire('Error', 'No se pudo agregar el producto', 'error');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Agregar
                </button>
            </form>
        </div>
    );
};

export default AddProduct;