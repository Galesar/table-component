import styles from './index.module.css';
import {useInput} from '../../hook/useInput';
import { useState } from 'react';

export default function AddFieldForm ({addObject}) {

    const [active, setActive] = useState(false);
    const changeActiveStatus = () => {
        if(active) {
            setActive(false);
        }
        else setActive(true);
    }

    const logNewData = () => {
        const newObject = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: {
                city: city,
                streetAddress: street,
                state: state,
                zip: zip
            },
            description: description
        }
        addObject(newObject)
        setActive(false)
        resetId();
        resetLastName();
        resetFirstName();
        resetCity();
        resetEmail();
        resetPhone();
        resetState();
        resetStreet();
        resetDescription();
        resetZip();
    }

    const {value: id, bind: bindId, reset: resetId} = useInput('');
    const {value: firstName, bind: bindFirstName, reset: resetFirstName} = useInput('');
    const {value: lastName, bind: bindLastName, reset: resetLastName} = useInput('');
    const {value: email, bind: bindEmail, reset: resetEmail} = useInput('');
    const {value: phone, bind: bindPhone, reset: resetPhone} = useInput('');
    const {value: city, bind: bindCity, reset: resetCity} = useInput('');
    const {value: street, bind: bindStreet, reset: resetStreet} = useInput('');
    const {value: state, bind: bindState, reset: resetState} = useInput('');
    const {value: zip, bind: bindZip, reset: resetZip} = useInput('');
    const {value: description, bind: bindDescription, reset: resetDescription} = useInput('');

    const renderForm = () => {
        if(active) {
        return (
            <div>
                <form>
                    <label>
                        <input type='number' placeholder="Id" {...bindId} />
                    </label>
                    <label>
                        <input type='email' placeholder="Email" {...bindEmail} />
                    </label>
                    <label>
                        <input type='text' placeholder="First Name" {...bindFirstName} />
                    </label>
                    <label>
                        <input type='text' placeholder="Last Name" {...bindLastName} />
                    </label>
                    <label>
                        <input type='tel' placeholder="Phone number" {...bindPhone} />
                    </label>
                    <label>
                        <input type='text' placeholder="State" {...bindState} />
                    </label>
                    <label>
                        <input type='text' placeholder="City" {...bindCity} />
                    </label>
                    <label>
                        <input type='text' placeholder="Street" {...bindStreet} />
                    </label>
                    <label>
                        <input type='number' placeholder="ZIP" {...bindZip} />
                    </label>
                    <label>
                        <textarea type='text' placeholder="Description" {...bindDescription} />
                    </label>
                    <button onClick={logNewData}>Confirm</button>
                </form>
            </div>
        )}
    }

    return (
    <div>
        <a href="#" onClick={changeActiveStatus} className={styles.AddButton}>Add object</a>
        {renderForm()}
    </div>)
}