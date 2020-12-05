import './App.css';
import Table from './component/Table';
import { useHttp } from './hook/useHttp';
import { useEffect, useState } from 'react';
import Loader from './component/loader/loader';

function App() {
  const {loading, error, request} = useHttp();
  const [data, setData] = useState([])
  useEffect(() => {
    getDataHandler()
  }, [])

  const getDataHandler = async () => {
    try {
      const data = await request(
        'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
        'GET',
      )
      setData(data);
    } catch (error) {}
  }

  const sortFunction = async (key = 'id', direction = 'up') => {
    let firstCondition, secondCondition;
    if(direction === 'up') {
      firstCondition = `firstItem.${key} > secondItem.${key}`;
      secondCondition = `firstItem.${key} < secondItem.${key}`;
    }
    else if (direction === 'down') {
      firstCondition = `firstItem.${key} < secondItem.${key}`;
      secondCondition = `firstItem.${key} > secondItem.${key}`;
    }
    setData(prevstate => {
      prevstate.sort((firstItem, secondItem) => {
      if(eval(firstCondition))
        return 1;
      else if (eval(secondCondition))
        return -1
      else return 0;
      })
      const newArr = [...prevstate];
      return newArr;
    })
  }

  const newObjectToData = (object) => {
    setData((prevstate) => {
      prevstate.unshift(object);
      const tempArr = [...prevstate];
      return tempArr
    })
  }

  const renderTable = () => {
    if(!loading) {
      return (
            <Table data={data} sort={sortFunction} addObject={newObjectToData}/>
      )
    }
    else return (
      <Loader />
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        {renderTable()}
      </header>
    </div>
  );
}

export default App;
