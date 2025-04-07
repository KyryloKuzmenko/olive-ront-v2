import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchOlives } from "../redux/olives/oliveThunk";

export const useOlives = (navigate) => {
  const dispatch = useDispatch();
  const { olives, error } = useSelector((state) => state.olives);

  useEffect(() => {
    dispatch(fetchOlives());

    const interval = setInterval(() => {
      dispatch(fetchOlives());
    }, 12000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return { olives };
};
