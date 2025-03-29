import { useEffect, useState } from "react";

import { getOlives } from "../services/api";

export const useOlives = (navigate) => {
  const [olives, setOlives] = useState([]);

  const fetchOlives = async () => {
    try {
      const { data } = await getOlives();
      setOlives(data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching olives:", error);
      }
    }
  };

  useEffect(() => {
    fetchOlives();

    const interval = setInterval(fetchOlives, 12000);

    return () => clearInterval(interval);
  }, []);

  return { olives, setOlives };
};
