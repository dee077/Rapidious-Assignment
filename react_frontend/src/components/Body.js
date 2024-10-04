import React, { useEffect } from 'react'
import Table from './Table'
import Select from './Select'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUniqueKeys } from '../redux/slices/uniqueKeysSlice'
import { fetchTableData } from '../redux/slices/tableDataSlice'
import Search from './Search';

const Body = () => {

  const dispatch = useDispatch();
  const { uniqueKeys } = useSelector((state) => state.uniqueKeys);
  const { tableData, pagination }  = useSelector((state) => state.tableData);

  console.log(tableData)

  useEffect(() => {
    dispatch(fetchUniqueKeys()); 
    dispatch(fetchTableData());
  }, [dispatch]);


  return (
    <div>
      <h1 className='text-5xl text-center font-bold my-12'>Find your perfect Dish with Recipe!</h1>
      <div className='flex mx-14'>
        <Search />
        <Select options={uniqueKeys} />
      </div>
      <Table tableData={tableData} pagination={pagination} />
    </div>
  )
}

export default Body
