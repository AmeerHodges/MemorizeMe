import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStreakTracker = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const lastLoginDateString = await AsyncStorage.getItem("lastLoginDate");
        const lastLoginDate = new Date(lastLoginDateString); // Convert stored date string to Date object

        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1); // Subtract 1 day from current date

        const yesterdayDateString = yesterdayDate.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

        if (lastLoginDateString === yesterdayDateString) {
          // User logged in yesterday, increment streak
          setStreak((prevStreak) => prevStreak + 1);
        } else {
          // User didn't log in yesterday, reset streak
          setStreak(1);
        }

        // Save current login date
        await AsyncStorage.setItem("lastLoginDate", yesterdayDateString);
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
