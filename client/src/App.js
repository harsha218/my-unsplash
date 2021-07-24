import React, { useState, useEffect } from 'react'
import Header from './Components/Header/Header'
import ImageSection from './Components/ImageSection/ImageSection'
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'
import { getUnSplash, addUnSplash, deleteUnSplash } from './httpCommon'

const App = () => {

	const [search, setSearch] = useState('');

	const [errMsg, setErrMsg] = useState(null);

	const [addModal, setAddModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [deleteItemId, setDeleteItemId] = useState(null);
	const [label, setLabel] = useState('');
	const [url, setUrl] = useState('');

	const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getUnSplash().then(res => {
            setData(res);
        }).catch(error => {
            console.log(error);
        })
    }

	const addPhoto = () => {
		setAddModal(true)
	}

	const deletePhoto = (id) => {
		setDeleteItemId(id)
		setDeleteModal(true)
	}

	const closeAddModal = () => {
		setAddModal(false);
		setLabel('');
		setUrl('');
		setErrMsg(null);
	}

	const closeDeleteModal = () => {
		setDeleteModal(false);
	}

	const handleAddSubmit = () => {
		if (label.trim() === '') {
			setErrMsg('Please Enter Label...');
			return;
		} else if (url.trim() === '') {
			setErrMsg('Please Enter Image Url...');
			return;
		}
		setErrMsg(null);
		addUnSplash(label, url).then(res => {
			console.log(res);
			getData();
			setAddModal(false);
			setLabel('');
			setUrl('');
		}).catch(error => {
			console.log(error);
		})
	}

	const handleDelete = () => {
		deleteUnSplash(deleteItemId).then(res => {
			getData();
			setDeleteModal(false);
		}).catch(err => {
			console.log(err);
		})
	}

	return (
		<div>
			<Header search={search} setSearch={setSearch} addPhoto={addPhoto} />
			<ImageSection data={data} deletePhoto={deletePhoto} />

			<Modal
				show={addModal}
				onHide={closeAddModal}
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add a Photo</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<InputGroup.Text>Label</InputGroup.Text>
						<FormControl aria-label="Label" value={label} maxLength={30} onChange={(e) => setLabel(e.target.value)} />
					</InputGroup>
					<InputGroup className="mb-3">
						<InputGroup.Text>Image Link</InputGroup.Text>
						<FormControl aria-label="Image Link" value={url} onChange={(e) => setUrl(e.target.value)} />
					</InputGroup>
					<p className='errMsg'>{errMsg}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleAddSubmit}>Submit</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				show={deleteModal}
				onHide={closeDeleteModal}
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete Photo</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure to Delete the Photo?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleDelete}>Delete</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default App
