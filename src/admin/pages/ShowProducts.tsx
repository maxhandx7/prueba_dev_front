import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Products';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

//ShowProduct
/*
Componente para mostrar los productos
*/

const API_URL = process.env.REACT_APP_API_URL;

const ShowProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL}/api/products/${id}`);
                setProducts(products.filter((product) => product.id !== id));
                Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Lista de Productos</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>
                                <Link
                                    to={`/admin/edit-product/${product.id}`}
                                    className="btn btn-warning me-2"
                                >
                                    Editar
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowProducts;