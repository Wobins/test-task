import React, {useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import { 
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
  Button,
  ListSubheader,
  ListItemText
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import getStyles from '../../utils/getStyles';
import generateUniqueID from '../../utils/generateUniqueID';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


const CreateEntryForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [sectorsList, setSectorsList] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    id: generateUniqueID(),
    name: "",
  });

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeOptions = (event) => {
    setSelectedItems(event.target.value);
  };

  const handleSectorChange = (event) => {
    setSelectedSectors(event.target.value);
  };

  const handleChangeSectors = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSectors(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/data/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        id: formData.id,
        name: formData.name,
        sectors: selectedSectors,
        agreeTerms: checked
      })
    });
    const data = await res.json();
    console.log(data)
    navigate("/");
  }

  // Fetch Sectors
  const fetchSectors = async () => {
    const res = await fetch('http://localhost:5000/sectors/')
    const data = await res.json()
    console.log(data)
    return data
  }

  useEffect(() => {
    const getSectors = async () => {
      const sectorsFromServer = await fetchSectors();
      setSectorsList(sectorsFromServer);
      console.log(sectorsFromServer)
    }
  
    getSectors();
  }, []);

  return (
    <>
      <div className="row py-5">
        <div className="col-lg-6 offset-lg-3">
            <Box
              component="form"
              autoComplete="off"
              onSubmit={handleSubmit}
              className='container'
            >
              <TextField 
                fullWidth required
                margin='normal' 
                id="name" 
                name='name'
                label="Name"
                value={formData.name} 
                onChange={handleChange}
              />
              {/* <FormControl fullWidth margin='normal' required>
                <InputLabel id="demo-multiple-name-label">Sectors</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={selectedSectors}
                  onChange={handleChangeSectors}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, selectedSectors, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}

              <FormControl fullWidth margin='normal' required >
                <InputLabel id="sectors">Select Items</InputLabel>
                <Select
                  labelId="sectors"
                  id="multiple-sectors"
                  multiple
                  value={selectedItems}
                  onChange={handleSectorChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {
                    sectorsList.map((el, index) => (
                      <div key={index}>
                        <MenuItem disabled>
                          <em>{el.title}</em>
                        </MenuItem>
                        {el.data.map(data => (
                          <MenuItem key={data.id} value={data.sector}>
                            {/* <Checkbox checked={selectedItems.indexOf(data.sector) > -1} /> */}
                            <Checkbox checked={selectedSectors.includes(data.sector)} />
                            <ListItemText primary={data.sector} />
                          </MenuItem>
                        ))}
                      </div>
                    ))
                  }
                </Select>
              </FormControl>

              <FormControl fullWidth>
      <InputLabel>Select Items</InputLabel>
      <Select
        multiple
        value={selectedItems}
        onChange={handleChangeOptions}
        renderValue={(selected) => selected.join(', ')}
      >
        <MenuItem disabled>
          <em>Group 1</em>
        </MenuItem>
        <MenuItem value="item1">
          <Checkbox checked={selectedItems.indexOf('item1') > -1} />
          <ListItemText primary="Item 1" />
        </MenuItem>
        <MenuItem value="item2">
          <Checkbox checked={selectedItems.indexOf('item2') > -1} />
          <ListItemText primary="Item 2" />
        </MenuItem>
        <MenuItem disabled>
          <em>Group 2</em>
        </MenuItem>
        <MenuItem value="item3">
          <Checkbox checked={selectedItems.indexOf('item3') > -1} />
          <ListItemText primary="Item 3" />
        </MenuItem>
        <MenuItem value="item4">
          <Checkbox checked={selectedItems.indexOf('item4') > -1} />
          <ListItemText primary="Item 4" />
        </MenuItem>
        {/* Add more items and groups as needed */}
      </Select>
    </FormControl>

              <FormControlLabel 
                required 
                margin="normal"
                label="Agree to terms" 
                control={
                  <Checkbox 
                    checked={checked} 
                    onChange={handleCheck} 
                    inputProps={{ 'aria-label': 'controlled' }} 
                  />
                } 
              />
              <div className='text-end'>
                <Button variant='contained' type='submit' margin="normal">
                  Save
                </Button>
              </div>
            </Box>
        </div>
      </div>
    </>
  )
}

export default CreateEntryForm;