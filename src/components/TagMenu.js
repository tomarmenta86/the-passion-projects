import React from "react";
import { Button, Menu, MenuItem, Chip } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material';

function TagMenu({ anchorEl, handleTagClick, handleTagClose, tags, getIcon, handleClearFilter}) {
    return (
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Button
            aria-controls="tag-menu"
            aria-haspopup="true"
            onClick={handleTagClick}
            startIcon={<MenuIcon />}
          >
            Filter by Tag
          </Button>
          <Menu
            id="tag-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleTagClose(null)}
          >
            {tags.map((tag, index) => (
              <MenuItem key={index} onClick={() => handleTagClose(tag)}>
                <Chip
                  icon={getIcon(tag)}
                  label={tag}
                  variant="outlined"
                  style={{ margin: '0.2rem' }}
                />
              </MenuItem>
            ))}
            <MenuItem onClick={handleClearFilter}>Clear Filter</MenuItem>
          </Menu>
        </div>
    );
}

export default TagMenu;