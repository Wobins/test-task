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
import createSectorsArray from '../../utils/createSectorsArray';

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

  const handleSectorChange = (event) => {
    // setSelectedSectors(event.target.value);
    const {
      target: { value },
    } = event;
    setSelectedSectors(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // const handleChangeSectors = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setSelectedSectors(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

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
    navigate("/");
  }

  // Fetch Sectors
  const fetchSectors = async () => {
    const res = await fetch('https://restful-api-vercel-iota.vercel.app/sectors')
    const data = await res.json()
    console.log(data)
    return data
  }

  useEffect(() => {
    const getSectors = async () => {
      const sectorsFromServer = await fetchSectors();
      setSectorsList(sectorsFromServer);
      console.log(createSectorsArray(sectorsFromServer));
    }

    
  
    getSectors();
  }, []);

  useEffect(() => {
    console.log(selectedSectors)
  }, [selectedSectors])

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
              

              <FormControl fullWidth margin='normal' required >
                <InputLabel id="sectors">Select sectors</InputLabel>
                <Select
                  labelId="sectors"
                  id="multiple-sectors"
                  multiple
                  value={selectedSectors}
                  onChange={handleSectorChange}
                  renderValue={(selected) => selected.join(', ')}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {createSectorsArray(sectorsList).map(data => (
                    <MenuItem key={data} value={data}>
                      <Checkbox checked={selectedSectors.indexOf(data) > -1} />
                      <ListItemText primary={data} />
                    </MenuItem>
                  ))}
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