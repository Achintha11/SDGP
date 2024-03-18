import React, { createContext, useState, useEffect } from 'react';

const UserDataContext = createContext({
  userData: null, // Initial state
  setUserData: (updatedData) => {}, // Function to update data (consider security)
});

// Provider component to hold and manage user data state
const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Initial data retrieval (replace with your actual logic)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        if (storedData) {
          setUserData(JSON.parse(storedData));
        }

      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Secured update logic (example)
  const updateUserData = async (updatedData) => {
    try {
      // Perform necessary validation or security checks on updatedData
      const sanitizedData = sanitizeUserData(updatedData); // Implement a security function

      await AsyncStorage.setItem('userData', JSON.stringify(sanitizedData));
      setUserData(sanitizedData); // Update context state
      console.log('Retrieved user data:', userData); // Log retrieved data

    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <UserDataContext.Provider value={{ userData, setUserData: updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataProvider };
