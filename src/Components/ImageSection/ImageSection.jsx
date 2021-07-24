import React, { useState } from 'react'
import classes from './ImageSection.module.scss'
import { Modal } from 'react-bootstrap'
// import Spinner from '../../Assets/spinner.gif'

const ImageSection = ({ data, deletePhoto }) => {

    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState(null)

    const handleClick = (url) => {
        setSelected(url);
        setShow(true);
    }

    return (
        <div className={classes.sectionContainer}>
            <div className={classes.masonry}>
                {data.map(item => {
                    return <div className={classes.item} key={item._id} onClick={() => handleClick(item.url)}>
                        <div className={classes.imageDelete} onClick={() => { deletePhoto(item._id) }}>
                            <span>Delete</span>
                        </div>
                        <div className={classes.imageLabel}>{item.label}</div>
                        <img src={item.url} alt={item.label} />
                    </div>
                })}
            </div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                keyboard={false}
                centered
            >
                <img style={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: '16px' }} src={selected} alt='Selected Image' />
            </Modal>
        </div>
    )
}

export default ImageSection
