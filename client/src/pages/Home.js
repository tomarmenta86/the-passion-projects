import React, { useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { tags, generateRandomJobs } from '../utils/jobUtils';
import { Grid, Box, Chip } from '@mui/material';
import Banner from '../components/Banner';
import JobList from '../components/JobList';
import Header from '../components/Header';
import TagMenu from '../components/TagMenu';
import Footer from '../components/Footer';
import { useQuery } from "@apollo/client";
import {QUERY_ALL_POSTS} from '../utils/queries';


function HomePage() {
  const { loading, data } = useQuery(QUERY_ALL_POSTS);
  const jobs = generateRandomJobs(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [activeTags, setActiveTags] = useState([]);

  const handleTagClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTagClose = (tag) => {
    setAnchorEl(null);
    setSelectedTag(tag);

    if (tag && !activeTags.includes(tag)) {
      setActiveTags((prevActiveTags) => [...prevActiveTags, tag]);
    }
  };

  const handleClearFilter = () => {
    setSelectedTag(null);
    setActiveTags([]);
  };

  ////*SEARCH FUNCTION CODE////
  // const handleSearch = (searchTerm) => {

  // };

  return (
    <div>
      <Header />
      <div className="bg-gray-100">
        <Banner />
        <Grid container direction="row" justifyContent="flex-start" alignItems="stretch">
          <Grid item xs={2}>
            {/* *SEARCH FUNCTION CODE */}
            {/* <TextField
              label="Search"
              variant="outlined"
              size="medium"
              onChange={(e) => handleSearch(e.target.value)}
              style={{ margin: '0.5rem' }}
            /> */}
            <TagMenu
              anchorEl={anchorEl}
              handleTagClick={handleTagClick}
              handleTagClose={handleTagClose}
              tags={tags}
              handleClearFilter={handleClearFilter}
              selectedTag={selectedTag}
              setAnchorEl={setAnchorEl}
              MenuIcon={MenuIcon}
            />
            {activeTags.map((tag, index) => (
              <Chip key={index} label={tag} style={{ margin: '0.2rem' }} />
            ))}
          </Grid>
          <Grid item xs={6}>
            {loading ? "Loading" :
            <JobList jobs={data?.posts} selectedTag={selectedTag || ''} />
            }
          </Grid>
        </Grid>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Footer/>
      </Box>
      </div>
    </div>
  );
}

export default HomePage;
