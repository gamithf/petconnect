import axios from "axios";
import { useState } from "react";

export function useAxios(initialConfig) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async (overrideConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        ...initialConfig,
        ...overrideConfig,
      });

      setData(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, sendRequest };
}
