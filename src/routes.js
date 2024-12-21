const express = require('express');
const connection = require('./db');

const app = express.Router();

// Ruta para obtener TODOS los productos
app.get('/productos', (req, res) => {
    const query = 'SELECT * FROM productos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener productos:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Ruta para obtener UN producto específico
app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    console.log('Buscando producto con ID:', id);

    const query = 'SELECT * FROM productos WHERE id = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al buscar producto:', error);
            return res.status(500).json({ error: error.message });
        }

        if (results.length === 0) {
            console.log('Producto no encontrado');
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(results[0]);
    });
});

// Crear nuevo producto
app.post('/productos', (req, res) => {
    const { name, description, price, imagen } = req.body;

    if (!name || !description || !price || !imagen) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO productos (name, description, price, imagen) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, description, price, imagen], (error, results) => {
        if (error) {
            console.error('Error al crear producto:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json({ id: results.insertId, message: 'Producto creado exitosamente' });
    });
});

// Actualizar producto
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, imagen } = req.body;

    if (!name || !description || !price || !imagen) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const query = 'UPDATE productos SET name = ?, description = ?, price = ?, imagen = ? WHERE id = ?';
    connection.query(query, [name, description, price, imagen, id], (error) => {
        if (error) {
            console.error('Error al actualizar producto:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Producto actualizado exitosamente' });
    });
});

// Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM productos WHERE id = ?';
    connection.query(query, [id], (error) => {
        if (error) {
            console.error('Error al eliminar producto:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Producto eliminado exitosamente' });
    });
});

module.exports = app;