import React from 'react';
import TextField from '@mui/material/TextField';
import { motion } from 'framer-motion';

interface SearchBarProps {
  searchQuery: string;
  onQueryChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onQueryChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <TextField
        label="Search GitHub User"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="e.g. facebook"
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'white',
            boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
            fontSize: { xs: '0.9rem', sm: '1rem' },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 'bold',
            fontSize: { xs: '0.9rem', sm: '1rem' },
          },
        }}
      />
    </motion.div>
  );
};

export default SearchBar;
