import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { SearchField } from '@aws-amplify/ui-react';

const ListEntries = () => {
  const [query, setQuery] = useState('');

  const onChange = (event) => {
    setQuery(event.target.value);
  };
  const onClear = () => {
    setQuery('');
  };

  return (
    <>
      <Container className="py-5">
        <div className="row">
          <div className="col-11">
            <SearchField
              fullWidth
              label="Search"
              placeholder="Search here..."
              hasSearchButton={false}
              hasSearchIcon={true}
              onChange={onChange}
              onClear={onClear}
              value={query}
            />
          </div>
          <div className="col-1 text-end">
            <Button fullWidth variant='contained' color="success" component={Link} to="/create-entry">
              New
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Accordion>
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
          </Accordion>
        </div>
      </Container>
    </>
  );
};

export default ListEntries;