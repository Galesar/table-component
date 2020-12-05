import { useState } from 'react';
import { useInput } from '../../hook/useInput';
import styles from './searchObjectForm.module.css'

export default function SearchObjectForm({findObject, resetFindObject}) { 

    const {value: searchInfo, bind: searchInfoBind, reset: searchInfoReset} = useInput('');

    const [active, setActive] = useState(false);
    const changeActiveStatus = () => {
        if(active) {
            setActive(false);
        }
        else setActive(true);
    }

    const findDataHandler = () => {
        findObject(searchInfo);
    }

    const renderForm = () => {
        if(active) {
            return (
                <div>
                    <form>
                        <label>
                        <input type='text' placeholder='Input object data' {...searchInfoBind} /> 
                        </label>
                        <button onClick={findDataHandler}>Find</button>
                        <button onClick={resetFindObject}>Reset</button>
                    </form>
                </div>
            )
        }
    }

    return (<div>
        <a href="#" onClick={changeActiveStatus} className={styles.FindButton}>Find object</a>
        {renderForm()}
    </div>)
}