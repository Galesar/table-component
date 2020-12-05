import { useEffect, useState } from 'react';
import styles from './index.module.css';

export default function HeaderTable({columns, sort}) {

    const[statusArr, setStatusArr] = useState([{}]);
    useEffect(() => {
        getStatusHandler();
    }, [])

    const getStatusHandler = () => {
        setStatusArr((prevstate) => {
            const tempArr = [];
            columns.map((item, index) => {
                tempArr.push({
                    index: index,
                    status: 'up'
                });
            })
            const newArr = [...tempArr];
            return newArr;
        })
    }
    
    const sortButton =  (statusIndex, sortKey) => {
        statusArr.map((item, index) => {
                sort(`${sortKey}`, `${item.status}`)
                setStatusArr((prevState) => {
                    if(prevState[index].status === 'up') prevState[index].status = 'down';
                    else if(prevState[index].status === 'down') prevState[index].status = 'up';
                    const newArr = [...prevState];
                    return newArr;
                })
        })
    }

    return(
        <thead className={styles.headTable}>
            <tr>
                {
                    columns.map((item, index) => {
                        if(item !== 'address') {  // переписать
                            if (item !== 'description'){ 
                            return (
                                <th key={index}>{item}<a href="#" onClick={e => {sortButton(index, `${item}`)}} className={styles.filterButtonUp}></a></th>
                            )}
                        }
                    })
                }
            </tr>
        </thead>
    )
}