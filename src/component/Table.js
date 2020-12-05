import { useEffect, useState } from "react";
import AddFieldForm from "./addFieldForm";
import BodyTable from "./bodyTable";
import HeaderTable from "./headerTable"
import SearchObjectForm from "./searchObjectForm/searchObjectForm";

import styles from './Table.module.css'

export default function Table({data, sort, addObject}) {

    //columns render
    const [columns, setColumns] = useState(['']);
    useEffect(() => {
            setPagesCount();
            getColumnsHandler();
            updatePage();
    }, [data])

    const getColumnsHandler = () => {
        setColumns(prevstate => {
            const columnsArray = [];
            for(const key in data[0]) {
                columnsArray.push(key);
            }
            const newArr = [...columnsArray];
            return newArr;
        })
    }
    // end columns render

    //Data Render
    const [pages, setPages] = useState({
        currentPage: 1,
        pages: 1,
        data: data
    })
    useEffect(() => {
        updatePage();
        console.log(pages);
    }, [pages.currentPage])

    const updatePage = () => {
        sliceData(data, pages.currentPage);
    }

    const setPagesCount = () => {
        setPages(prevstate => { 
            prevstate.pages = Math.ceil(data.length/10);
            return {...prevstate}});
    }

    const sliceData = (array, page) => {
        let upperLimit;
        let lowerLimit;
        if(page === pages.pages) {
            upperLimit = data.length;
            lowerLimit = upperLimit - 10;
        } else if (page === 0) {
            upperLimit = 10;
            lowerLimit = 0;
        } else {
            upperLimit = Number(`${page}0`);
            lowerLimit = upperLimit - 10;
        }
        setPages((prevstate) => {
            const tempData = array.slice(lowerLimit, upperLimit);
            prevstate.data = [...tempData]
            return prevstate;
        })
    }

    const nextPage = () => {
        let tempObject = pages;
        if(tempObject.currentPage < tempObject.pages)
         tempObject.currentPage = tempObject.currentPage + 1;
        setPages({...tempObject})
    }

    const previousPage = () => {
        let tempObject = pages;
        if(tempObject.currentPage > 1) 
         tempObject.currentPage = tempObject.currentPage - 1;
        setPages({...tempObject})
    }

    const [objectData, setObjectData] = useState({})
    const renderObject = (hidden) => {
        console.log(objectData)
        if(isEmptyObject(objectData)) { return (
        <div className={styles.objectDataContainer + ` ${hidden}`}>
            <h3>ID: {objectData.id}</h3>
            <h3>Email: {objectData.email}</h3>
            <h3>First name: {objectData.firstName}</h3>
            <h3>Last name: {objectData.lastName}</h3>
            <h3>Phone: {objectData.phone}</h3>
            <h3>Description: {objectData.description}</h3>
            <div>
                <span>Address:</span> 
                <h3>City: {objectData.address.city}</h3>
                <h3>State: {objectData.address.state}</h3>
                <h3>Street Address: {objectData.address.streetAddress}</h3>
                <h3>Zip: {objectData.address.zip}</h3>
            </div>
        </div>
        )}
    }

    const isEmptyObject = (object = objectData) => {
        for(let i in object) {
            if(object.hasOwnProperty(i)) {
                return true;
            }
        }
        return false;
    }
    // end Data Render

    // Find in table function
    const findObject = (searchKey) => {
        const tempArr = [];
        data.map(item => {
            for(let key in item) {
                let tempValue = item[key];
                tempValue = tempValue.toString()
                if(tempValue.includes(searchKey)) {
                    tempArr.push(item);
                }
            }
        })
        let tempObject = pages;
        tempObject.data = tempArr;
        setPages({...tempObject});
        console.log(tempArr);
    }

    const resetFindObject = () => {
        const tempObject = pages;
        tempObject.data = data;
        setPages({...tempObject})
        updatePage();
    }

    // end find in table function


    return (
        <div className={styles.container}>
            <SearchObjectForm findObject={findObject} resetFindObject={resetFindObject} />
            <AddFieldForm addObject={addObject} />

            <table>
                <HeaderTable columns={columns} sort={sort} />
                <BodyTable data={pages.data} getObject={setObjectData} />
            </table>

            {renderObject()}

            <div className={styles.navigationBar}>
                <button className={styles.changePageButton} onClick={previousPage}>previousPage</button>
                <span className={styles.currentPage}>{pages.currentPage}</span>
                <button className={styles.changePageButton} onClick={nextPage}>next page</button>
            </div>
        </div>
    )
}