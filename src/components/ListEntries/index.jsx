import React, { useState, useEffect } from "react";
import { 
  Button,
  Container,
  Chip,
  Stack,
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
    const res = await fetch('http://localhost:5000/data/')
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
      <Container className="py-5">
        <div className="row">
          <div className="col-11">
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
          <div className="col-1">
            <Button variant='contained' color="success" component={Link} to="/create-entry">
              New
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <List>
            {
              searchInArray(query, entries).map(entry => (
                <>
                  <ListItem alignItems="flex-start" key={entry.id}>
                    <ListItemAvatar>
                        <Avatar alt={entry.name} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={entry.name}
                        secondary={
                          <Stack direction="row" spacing={1} className="pt-3">
                            {
                              entry.sectors.map((sector, index) => (
                                <Chip key={index} label={sector} />
                              ))
                            }
                          </Stack>
                        }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))
            }
          </List>
          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion> */}
        </div>
      </Container>
    </>
  );
};

export default ListEntries;