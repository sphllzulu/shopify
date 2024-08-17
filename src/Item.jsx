import React from 'react';
import { useDispatch } from 'react-redux';
import { updateItem, deleteItem } from './shoppingListSlice';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const Item = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdate = async (updatedItem) => {
    await axios.put(`http://localhost:3001/items/${item.id}`, updatedItem);
    dispatch(updateItem(updatedItem));
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/items/${item.id}`);
    dispatch(deleteItem(item.id));
  };

  return (
    <div>
      <TextField
        defaultValue={item.name}
        onBlur={(e) => handleUpdate({ ...item, name: e.target.value })}
      />
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default Item;
