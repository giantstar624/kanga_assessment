// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Importing CSS for styling

const HomePage = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        fetch('http://localhost:8000/api/items/')
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);

    const handleAddItem = () => {
        if (newItem.trim()) {
            fetch('http://localhost:8000/api/items/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newItem }),
            })
                .then(response => response.json())
                .then(item => setItems([...items, item]))
                .catch(error => console.error('Error:', error));

            setNewItem(""); // Clear the input field after adding
        }
    };

    return (
        <div className="homepage-container">
            <h1>Welcome to My Brilliant Website</h1>
            <div className="item-list-container">
                <h2>Items</h2>
                <ul className="item-list">
                    {items.map(item => (
                        <li key={item.id} className="item">
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="add-item-container">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter new item"
                    className="item-input"
                />
                <button onClick={handleAddItem} className="add-item-button">
                    Add Item
                </button>
            </div>
        </div>
    );
};

export default HomePage;
