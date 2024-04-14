import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStreakTracker = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const lastLoginDate = await AsyncStorage.getItem("lastLoginDate");
        const yesterdayDate = new Date();
        yesterdayDate
          .setDate(yesterdayDate.getDate - 1)
          .toISOString()
          .split("T")[0]; // Get current date in YYYY-MM-DD format
        if (lastLoginDate === yesterdayDate) {
          // User logged in today, increment streak
          setStreak((prevStreak) => prevStreak + 1);
        } else {
          // User didn't log in today, reset streak
          setStreak(1);
        }
        // Save current login date
        await AsyncStorage.setItem("lastLoginDate", yesterdayDate);
      } catch (error) {
        console.log("Error fetching streak:", error);
      }
    };

    fetchStreak();
  }, []);
  console.log("Streak: " + streak);
  return streak;
};

export default useStreakTracker;
