import React, { useState } from 'react';
import { GitHubUser, GitHubRepo, getUserRepos } from '../services/githubApi';
import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import RepoList from './RepoList';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTheme, useMediaQuery } from '@mui/material';

interface UserListProps {
  users: GitHubUser[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <Box sx={{ px: { xs: 1, sm: 2 } }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' } }}
      >
        Showing users
      </Typography>
      {users.length === 0 && (
        <Typography variant="body2" color="textSecondary">
          No users found.
        </Typography>
      )}
      <List>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </List>
    </Box>
  );
};

interface UserItemProps {
  user: GitHubUser;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [displayedPages, setDisplayedPages] = useState<number>(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const perPage = isMobile ? 4 : 8;

  const {
    data: repoData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<GitHubRepo[], Error, { pages: GitHubRepo[]; pageParams: number[] }, [string, string], number>({
    queryKey: ['userRepos', user.login],
    initialPageParam: 1,
    queryFn: (context: QueryFunctionContext<[string, string], number>) => {
      const pageParam = typeof context.pageParam === 'number' ? context.pageParam : 1;
      return getUserRepos(user.login, pageParam, perPage);
    },
    enabled: true,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === perPage ? allPages.length + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  });

  const pages = repoData ? repoData.pages : [];
  const displayedRepos: GitHubRepo[] = pages.slice(0, displayedPages).flat();

  const handleToggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const handleLoadMore = async () => {
    if (repoData && displayedPages === repoData.pages.length && hasNextPage) {
      await fetchNextPage();
    }
    setDisplayedPages((prev) => prev + 1);
  };

  const handleShowLess = () => {
    setDisplayedPages(1);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleToggleExpand}>
          <ListItemAvatar>
            <Avatar alt={user.login} src={user.avatar_url} />
          </ListItemAvatar>
          <ListItemText primary={user.login} />
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      {expanded && (
        <Box sx={{ ml: { xs: 2, sm: 4 } }}>
          {isLoading && <Typography>Loading repos...</Typography>}
          {isError && (
            <Typography color="error">{(error as Error).message}</Typography>
          )}
          {!isLoading && !isError && (
            <>
              <RepoList
                repos={displayedRepos}
                username={user.login}
                onLoadMore={handleLoadMore}
                hasMore={
                  hasNextPage ||
                  (repoData ? displayedPages < repoData.pages.length : false)
                }
                isLoadingMore={isFetchingNextPage}
              />
              {displayedPages > 1 && (
                <Box sx={{ mt: 1, textAlign: 'center' }}>
                  <Button
                    variant="text"
                    onClick={handleShowLess}
                    fullWidth
                    sx={{
                      textAlign: 'center',
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      textTransform: 'none',
                    }}
                  >
                    Show Less
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default UserList;
