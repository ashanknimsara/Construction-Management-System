import { useState, useEffect } from 'react';
import SupplierManagerService from '../Services/SupplierManagerService';

export const useFetch = () => {
  const [allSuppliers, setAllsuppliers] = useState([]);
  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    SupplierManagerService.getSuppliereDetails().then((resp) => {
      setAllsuppliers(resp.data);
      console.log(allSuppliers);
    });
  }, []);

  useEffect(() => {
    SupplierManagerService.getItemsDetails().then((resp) => {
      setAllItems(resp.data);
      console.log(allItems);
    });
  }, []);
  return { allSuppliers, allItems };
};
