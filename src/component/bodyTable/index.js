import { Fragment, useEffect } from 'react';
import styles from './index.module.css';

export default function BodyTable({data, getObject}) {
    useEffect(() => {
        console.log(data);
    }, [data])

    const renderItem = (object) => {
        return Object.keys(object).map((item, index) => {
            if(item !== 'address') {
                if(item !== 'description')
                return (
                    <td key={index}><a href="#" onClick={e => getObject(object)}>
                        {object[item]}
                    </a></td>
                )
        }
        })
    }

    return (
            <tbody className={styles.bodyTable}>
                    {
                    data.map((item, index) => {
                        return <tr className={styles.row} >{renderItem(item)}</tr>
                    })
                    }
            </tbody>
    )
}