import React from 'react'
import classes from './Header.module.scss'
import icon from '../../Assets/logo.svg'
import { BsSearch } from 'react-icons/bs'

const Header = ({search, setSearch, addPhoto}) => {

    return (
        <div className={classes.headerContainer}>
            <img src={icon} alt="icon" />
            <div className={classes.searchContainer}>
                <BsSearch />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search By Name" />
            </div>
            <div className={`${classes.addPhoto} ms-auto`} onClick={addPhoto} >Add a Photo</div>
            {/* <BsInfoCircle size={20} /> */}
        </div>
    )
}

export default Header
