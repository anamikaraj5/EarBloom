export const getUserProfile = async () => {
    try {
      const response = await fetch('http://192.168.214.134:3000/user/profile', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
  
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };
  