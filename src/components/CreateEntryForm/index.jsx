import React, {useState} from 'react';
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
  Button
} from '@mui/material';
import getStyles from '../../utils/getStyles'

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
  const [sectors, setSectors] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSectors(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

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
              />
              <FormControl fullWidth margin='normal' required>
                <InputLabel id="demo-multiple-name-label">Sectors</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={sectors}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, sectors, theme)}
                    >
                      {name}
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