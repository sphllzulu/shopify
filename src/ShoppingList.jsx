import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLists, setItems, addItem, deleteItem } from './shoppingListSlice';
import axios from 'axios';
import {
  Container,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Fab
} from '@mui/material';
import { orange } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import CategoryIcon from '@mui/icons-material/Category';
import GroceryIcon from '@mui/icons-material/ShoppingCart';
import HouseholdIcon from '@mui/icons-material/Home';
import OtherIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.shoppingList.lists);
  const items = useSelector((state) => state.shoppingList.items);
  const [openModal, setOpenModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [selectedListId, setSelectedListId] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    const fetchLists = async () => {
      const response = await axios.get('http://localhost:3001/shoppingLists');
      dispatch(setLists(response.data));
    };

    const fetchItems = async () => {
      const response = await axios.get('http://localhost:3001/items');
      dispatch(setItems(response.data));
    };

    fetchLists();
    fetchItems();
  }, [dispatch]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleAddItem = async () => {
    const newItem = {
      name: newItemName,
      quantity: newItemQuantity,
      category: newItemCategory,
      listId: selectedListId,
    };
    const response = await axios.post('http://localhost:3001/items', newItem);
    dispatch(addItem(response.data));
    setFilteredItems([response.data]);
    handleCloseModal();
    handleOpenDrawer();
  };

  const handleDeleteItem = async (itemId) => {
    await axios.delete(`http://localhost:3001/items/${itemId}`);
    dispatch(deleteItem(itemId));
  };

  const handleFilterByCategory = (category) => {
    const filtered = items.filter(item => item.category === category);
    setFilteredItems(filtered);
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        sx={{ backgroundColor: orange[500], '&:hover': { backgroundColor: orange[700] }, margin: '20px 0' }}
      >
        Add Shopping List Item
      </Button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            animation: 'fadeIn 0.5s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translate(-50%, -45%)' },
              to: { opacity: 1, transform: 'translate(-50%, -50%)' },
            },
          }}
        >
          <Typography variant="h6" gutterBottom>Add New Item</Typography>
          <TextField
            label="Item Name"
            fullWidth
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Quantity"
            fullWidth
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(e.target.value)}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
            >
              <MenuItem value="Groceries">Groceries</MenuItem>
              <MenuItem value="Household">Household</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Shopping List</InputLabel>
            <Select
              value={selectedListId}
              onChange={(e) => setSelectedListId(e.target.value)}
            >
              {lists.map((list) => (
                <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ backgroundColor: orange[500], '&:hover': { backgroundColor: orange[700] }, mt: 2 }}
            onClick={handleAddItem}
          >
            Add Item
          </Button>
        </Box>
      </Modal>

      {lists.map((list) => (
        <div key={list.id}>
          <Typography variant="h5" sx={{ marginTop: theme.spacing(2), color: orange[500] }}>
            {list.name}
          </Typography>
          {items.filter(item => item.listId === list.id).map(item => (
            <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
              <IconButton edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </div>
      ))}

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: theme.spacing(2),
          right: theme.spacing(2),
          backgroundColor: orange[500],
          '&:hover': { backgroundColor: orange[700] },
        }}
        onClick={handleOpenDrawer}
      >
        <CategoryIcon />
      </Fab>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            borderRadius: '20px 20px 0 0',
            padding: theme.spacing(2),
            backgroundColor: orange[100],
            animation: 'slideUp 0.5s ease-in-out',
            '@keyframes slideUp': {
              from: { transform: 'translateY(100%)' },
              to: { transform: 'translateY(0)' },
            },
          },
        }}
      >
        <Typography variant="h6" gutterBottom>Recently Added Item</Typography>
        <List>
          {filteredItems.map(item => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="h6" gutterBottom>Categories</Typography>
        <List sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <ListItem button onClick={() => handleFilterByCategory('Groceries')}>
            <ListItemIcon><GroceryIcon /></ListItemIcon>
            <ListItemText primary="Groceries" />
          </ListItem>
          <ListItem button onClick={() => handleFilterByCategory('Household')}>
            <ListItemIcon><HouseholdIcon /></ListItemIcon>
            <ListItemText primary="Household" />
          </ListItem>
          <ListItem button onClick={() => handleFilterByCategory('Other')}>
            <ListItemIcon><OtherIcon /></ListItemIcon>
            <ListItemText primary="Other" />
          </ListItem>
        </List>
      </Drawer>
    </Container>
  );
};

export default ShoppingList;
