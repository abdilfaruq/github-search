export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
  }
  
  export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    html_url: string;
  }
  
  export async function searchUsers(query: string): Promise<GitHubUser[]> {
    if (!query) return [];
    
    const token = process.env.REACT_APP_GITHUB_TOKEN;
  
    const response = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=5`,
      {
        headers: token ? { Authorization: `token ${token}` } : {},
      }
    );
    if (!response.ok) {
      throw new Error(`Error searching users: ${response.status}`);
    }
    const data = await response.json();
    return data.items;
  }
  
  export async function getUserRepos(
    username: string,
    page: number = 1,
    per_page: number = 10
  ): Promise<GitHubRepo[]> {
    const token = process.env.REACT_APP_GITHUB_TOKEN;
  
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}`,
      {
        headers: token ? { Authorization: `token ${token}` } : {},
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching repos for user ${username}: ${response.status}`);
    }
    return response.json();
  }
  