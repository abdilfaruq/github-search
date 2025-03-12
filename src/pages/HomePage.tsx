import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import UserList from '../components/UserList';
import { GitHubUser, searchUsers } from '../services/githubApi';
import { useQuery } from '@tanstack/react-query';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const { data: users = [], isLoading, error, refetch } = useQuery<
    GitHubUser[],
    Error
  >({
    queryKey: ['searchUsers', submittedQuery],
    queryFn: () => searchUsers(submittedQuery),
    enabled: false,
    staleTime: 1000 * 60 * 5,
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setSubmittedQuery(searchQuery.trim());
  };

  useEffect(() => {
    if (submittedQuery) {
      refetch();
    }
  }, [submittedQuery, refetch]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
            borderRadius: 2,
            p: { xs: 2, sm: 3 },
            mb: { xs: 3, sm: 4 },
            textAlign: 'center',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: 1,
              fontSize: { xs: '1.8rem', sm: '2.2rem' },
            }}
          >
            GitHub repositories explorer
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Paper
          sx={{
            p: { xs: 2, sm: 3 },
            mb: { xs: 3, sm: 3 },
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'background.paper',
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <SearchBar searchQuery={searchQuery} onQueryChange={setSearchQuery} />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                textTransform: 'none',
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              Search
            </Button>
          </form>
        </Paper>
      </motion.div>

      {isLoading && (
        <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />
      )}
      {error && <Alert severity="error">{error.message}</Alert>}

      {users.length > 0 && <UserList users={users} />}
    </Container>
  );
};

export default HomePage;
