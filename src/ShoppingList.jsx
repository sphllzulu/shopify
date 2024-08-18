import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLists, setItems, addItem, deleteItem, updateItem } from './shoppingListSlice';
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
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { useTheme } from '@mui/material/styles';
import GroceryIcon from '@mui/icons-material/ShoppingCart';
import HouseholdIcon from '@mui/icons-material/Home';
import OtherIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Carousel from './Carousel';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.shoppingList.lists);
  const items = useSelector((state) => state.shoppingList.items);
  const user = useSelector((state) => state.user); // Assuming user data is stored in the user slice
  const [openModal, setOpenModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [selectedListId, setSelectedListId] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null); // State for item to edit
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter

  const slides = [
    {
      image: 'banner.jpg',
      title: 'Slide 1',
      description: 'This is the first slide.',
    },
    {
      image: 'groceries.jpg',
      title: 'Slide 2',
      description: 'This is the second slide.',
    },
    {
      image: 'groceries.jpg',
      title: 'Slide 3',
      description: 'This is the third slide.',
    },
  ];

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

  useEffect(() => {
    if (editItemId !== null) {
      const item = items.find(item => item.id === editItemId);
      if (item) {
        setNewItemName(item.name);
        setNewItemQuantity(item.quantity);
        setNewItemCategory(item.category);
        setSelectedListId(item.listId);
        setOpenModal(true);
      }
    }
  }, [editItemId, items]);

  useEffect(() => {
    if (user.userId) {
      const userItems = items.filter(item => item.userId === user.userId);
      if (categoryFilter) {
        setFilteredItems(userItems.filter(item => item.category === categoryFilter));
      } else {
        setFilteredItems(userItems);
      }
    }
  }, [items, user.userId, categoryFilter]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditItemId(null); // Reset edit item ID
  };
  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleAddItem = async () => {
    const newItem = {
      name: newItemName,
      quantity: newItemQuantity,
      category: newItemCategory,
      listId: selectedListId,
      userId: user.userId, // Associate the item with the current user
    };
    const response = await axios.post('http://localhost:3001/items', newItem);
    dispatch(addItem(response.data));
    handleCloseModal();
    handleOpenDrawer();
  };

  const handleUpdateItem = async () => {
    const updatedItem = {
      name: newItemName,
      quantity: newItemQuantity,
      category: newItemCategory,
      listId: selectedListId,
      userId: user.userId, // Associate the item with the current user
    };
    const response = await axios.put(`http://localhost:3001/items/${editItemId}`, updatedItem);
    dispatch(updateItem(response.data));
    handleCloseModal();
    handleOpenDrawer();
  };

  const handleDeleteItem = async (itemId) => {
    await axios.delete(`http://localhost:3001/items/${itemId}`);
    dispatch(deleteItem(itemId));
  };

  const handleEditItem = (item) => {
    setEditItemId(item.id); // Set the item to be edited
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    handleOpenDrawer();
  };

  return (
    <div>
      <Carousel slides={slides} />
    <Container>
      
      {/* <Typography variant="h4" gutterBottom>Shopping List</Typography> */}
      <Fab variant="contained" color="primary" onClick={handleOpenModal} sx={{ position: 'fixed', bottom: 20, background:'#F3C402' }}><AddIcon /></Fab>
      <Drawer anchor="bottom" open={drawerOpen} onClose={handleCloseDrawer}
      sx={{
                '& .MuiDrawer-paper': {
               borderRadius: '20px 20px 0 0',
                 padding: theme.spacing(2),
                   backgroundColor:'white',
                  animation: 'slideUp 0.5s ease-in-out',
                   '@keyframes slideUp': {
                     from: { transform: 'translateY(100%)' },
                  to: { transform: 'translateY(0)' },
                  },
               },
               }}
      
      >
        <List>
          {filteredItems.map(item => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity} | Category: ${item.category}`} />
              <ListItemIcon>
                <IconButton onClick={() => handleEditItem(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          ))}
          <Divider />
          <div>
          <ListItem>
            <Button onClick={() => handleCategoryFilter('')} fullWidth sx={{color:'#f3c402'}}>
              Categories
            </Button>
          </ListItem>
          <ListItem sx={{display:'flex', justifyContent:'space-around'}}>
            <IconButton onClick={() => handleCategoryFilter('Grocery')}>
              <GroceryIcon />
            </IconButton>
            <IconButton onClick={() => handleCategoryFilter('Household')}>
              <HouseholdIcon />
            </IconButton>
            <IconButton onClick={() => handleCategoryFilter('Other')}>
              <OtherIcon />
            </IconButton>
          </ListItem>
          </div>
        </List>
      </Drawer>
      <Modal open={openModal} onClose={handleCloseModal} sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Box sx={{ ...theme.modalStyle, background:'white', width:'80%', padding:'20px' }}>
          <Typography variant="h6" gutterBottom>{editItemId ? 'Edit Item' : 'Add Item'}</Typography>
          <TextField
            label="Item Name"
            fullWidth
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Quantity"
            type="number"
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
              <MenuItem value="Grocery">Grocery</MenuItem>
              <MenuItem value="Household">Household</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          {/* <FormControl fullWidth margin="normal">
            <InputLabel>List</InputLabel>
            <Select
              value={selectedListId}
              onChange={(e) => setSelectedListId(e.target.value)}
            >
              {lists.map(list => (
                <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <Button variant="contained" color="primary" onClick={editItemId ? handleUpdateItem : handleAddItem} fullWidth sx={{background:'#FECF06'}}>
            {editItemId ? 'Update Item' : 'Add Item'}
          </Button>
        </Box>
      </Modal>
      <Fab
        color="primary"
        aria-label="open"
        onClick={handleOpenDrawer}
        sx={{ position: 'fixed', bottom: 16, right: 16, background:'#F3C402' }}
      >
        <KeyboardArrowUpRoundedIcon/>
      </Fab>
    </Container>
    </div>
  );
};

export default ShoppingList;
