import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


//EditProduct
/*
Componente para editar un producto
*/

const API_URL = process.env.REACT_APP_API_URL;

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/products/${id}`);
            setName(response.data.name);
            setDescription(response.data.description);
            setPrice(response.data.price.toString());
        } catch (error) {
            console.error('Error al obtener el producto:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !description || !price) {
            Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        try {
            await axios.put(`${API_URL}/api/products/${id}`, {
                name,
                description,
                price: parseFloat(price),
            });
            Swal.fire('Éxito', 'Producto actualizado correctamente', 'success');
            navigate('/admin/products');
        } catch (error) {
            Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Editar Producto</h2>
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
                    Actualizar
                </button>
            </form>
        </div>
    );
};

export default EditProduct;