import React, { useState, useEffect } from "react";
import { 
  Button,
  Container,
  Chip,
  Stack,
  Box,
  ListItem,
  List,
  Divider,
  Avatar,
  ListItemText,
  ListItemAvatar, 
  Typography 
} from "@mui/material";
import { Link } from "react-router-dom";
import { SearchField } from '@aws-amplify/ui-react';
import searchInArray from "../../utils/searchInArray";
// import './styles.css';

const ListEntries = () => {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState([]);

  const onChange = (event) => {
    setQuery(event.target.value);
  };
  const onClear = () => {
    setQuery('');
  };

  // Fetch Entries
  const fetchEntries = async () => {
    const res = await fetch('https://restful-api-vercel-iota.vercel.app/data')
    const data = await res.json()
    console.log(data)
    return data
  }

  useEffect(() => {
    const getEntries = async () => {
      const entriesFromServer = await fetchEntries();
      setEntries(entriesFromServer);
    }
  
    getEntries()
  }, []);

  return (
    <>
      <Container className="py-5 mb-3">
        <div className="row">
          <div className="col-md-2 order-md-2 my-3 my-md-0">
            <Button fullWidth variant='contained' color="success" component={Link} to="/create-entry">
              New
            </Button>
          </div>
          <div className="col-md-10">
            <SearchField
              label="Search"
              placeholder="Search by name here..."
              hasSearchButton={false}
              hasSearchIcon={true}
              onChange={onChange}
              onClear={onClear}
              value={query}
            />
          </div>
        </div>

        <div className="mt-4">
          <List>
            {
              searchInArray(query, entries).map(entry => (
                <div key={entry.id}>
                  <ListItem alignItems="flex-start" >
                    <ListItemAvatar>
                      <Avatar alt={entry.name} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={entry.name}
                      secondary={
                        <Box xs={{width: 90}} direction="row" spacing={1} className="pt-2">
                          {
                            entry.sectors.map((sector, index) => (
                              <Chip key={index} label={sector} className="me-1 my-1" />
                            ))
                          }
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              ))
            }
          </List>
        </div>
      </Container>
    </>
  );
};

export default ListEntries;