import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Translate } from "../../../Enums/Tranlate";
import BaseService from "../../../../services/BaseService";
import Loader from "../../../common/Loader";
import uploadImg from "../../../../images/upload-img.png"
import '../style.scss'
import DesignService from "../../../../services/DesignService";
import Select from "react-select";

const AddModal = ({modal, setModal, setShouldUpdate, item})=>{
    const [formData, setFormData]= useState({
        name: "",
        type: "",
        country: ""
    })
    const [loading, setLoading]= useState(false)
    const [loadingSubmit, setLoadingSubmit]= useState(false)
    const [edit, setEdit]= useState(false)
    const designService = new DesignService()
    const lang = useSelector(state=> state.auth?.lang)

    const hamdleSubmit = (e) => {
        e.preventDefault()
        setLoadingSubmit(true)
        let data = {
            title: formData.title,
            image: formData.image
        }
        if(edit){
            designService.update(formData.id, data).then(res=>{
                if(res?.status === 200){
                    toast.success('Updated Successfully.')
                    setShouldUpdate(prev=> !prev)
                    setModal()
                }
                setLoadingSubmit(false)
            }).catch(()=> setLoadingSubmit(false))
        } else {
            designService.create(data).then(res=>{
                if(res?.status === 201){
                    toast.success('Added Successfully.')
                    setShouldUpdate(prev=> !prev)
                    setModal()
                }
                setLoadingSubmit(false)
            }).catch(()=> setLoadingSubmit(false))
        }

    }

    return(
        <Modal className="fade design-modal" show={modal} onHide={()=>{
            setModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={hamdleSubmit}>
            <Modal.Header>
            <Modal.Title>{Translate[lang].add}</Modal.Title>
            <Button
                variant=""
                className="close"
                onClick={()=>{
                    setModal()
                }}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                <Row>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang].name}
                                type='text'
                                placeholder={Translate[lang].name}
                                bsSize="lg"
                                name='name'
                                value={formData.name}
                                onChange={e=> setFormData({...formData, name: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <label>{Translate[lang].type}</label>
                            <Select
                                options={[
                                    {label: 'Local', value: 'local'},
                                    {label: 'International', value: 'international'},
                                ]}
                                value={formData.type}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang].country}
                                type='text'
                                placeholder={Translate[lang].country}
                                bsSize="lg"
                                name='country'
                                value={formData.country}
                                onChange={e=> setFormData({...formData, country: e.target.value})}
                            />
                        </Col>
                    </Row>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
            <Button onClick={setModal} variant="danger light">
            {Translate[lang].cancel}
            </Button>
            <Button 
                    variant="primary" 
                    type='submit'
                    disabled={loadingSubmit}
                >{Translate[lang].send}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddModal;