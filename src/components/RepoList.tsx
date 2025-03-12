import React from 'react';
import { GitHubRepo } from '../services/githubApi';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Link,
  Box,
  Paper,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';

interface RepoListProps {
  repos: GitHubRepo[];
  username: string;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
}

const RepoList: React.FC<RepoListProps> = ({
  repos,
  username,
  onLoadMore,
  hasMore,
  isLoadingMore,
}) => {
  return (
    <Box sx={{ mt: 3, px: { xs: 1, sm: 2 } }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', mb: { xs: 2, sm: 2 }, textAlign: 'center' }}
      >
        Repositories for "{username}"
      </Typography>

      {repos.length === 0 ? (
        <Paper
          sx={{
            p: { xs: 2, sm: 3 },
            mt: 2,
            border: '1px dashed',
            borderColor: 'grey.300',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            No repositories available.
          </Typography>
        </Paper>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Grid container spacing={2}>
            {repos.map((repo, index) => {
              const isEven = index % 2 === 0;
              const cardBackground = isEven
                ? {
                    backgroundColor: '#fafafa',
                    backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)',
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0',
                  }
                : {
                    backgroundColor: '#fff',
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #fff 10px, #fff 20px)',
                  };

              return (
                <Grid item xs={12} sm={6} key={repo.id}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: 3,
                      borderRadius: 2,
                      ...cardBackground,
                      p: { xs: 1, sm: 2 },
                    }}
                  >
                    <CardContent
                      sx={{
                        overflow: 'hidden',
                        p: { xs: 1, sm: 2 },
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: 600,
                          wordWrap: 'break-word',
                          whiteSpace: 'normal',
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontSize: { xs: '1rem', sm: '1.1rem' },
                        }}
                      >
                        <Link
                          href={repo.html_url}
                          target="_blank"
                          underline="none"
                          color="primary"
                          sx={{ fontWeight: 600 }}
                        >
                          {repo.name}
                        </Link>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        }}
                      >
                        {repo.description || 'No description'}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ mt: 'auto', px: { xs: 1, sm: 2 }, pb: { xs: 1, sm: 2 } }}>
                        <CardActions sx={{ mt: 'auto', px: { xs: 1, sm: 2 }, pb: { xs: 1, sm: 2 } }}>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                                <StarIcon sx={{ mr: 0.5, fontSize: { xs: '0.8rem', sm: '0.9rem' } }} />
                                {repo.stargazers_count}
                            </Typography>
                        </CardActions>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </motion.div>
      )}

      {hasMore && (
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            sx={{
              textTransform: 'none',
              px: 3,
              py: 1,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
            }}
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default RepoList;
