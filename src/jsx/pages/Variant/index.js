import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import VariantService from "../../../services/VariantService";
import Loader from "../../common/Loader";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import { Translate } from "../../Enums/Tranlate";
// import CardItem from "./CardItem";
import './style.scss'

const Variant = () =>{
    const [variant, setVariant] = useState([])
    const [search, setSearch] = useState(null)
    const [hasData, setHasData] =useState(0)
    const [shouldUpdate, setShouldUpdate] =useState(false)
    const [loading, setLoading] =useState(false)
    const navigate = useNavigate()
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    // const variantService = new VariantService()


    return(
        <>
          <div className="d-flex justify-content-between align-items-center mb-3 ">
            <div className="input-group w-50">
            <input 
                type="text" 
                style={{borderRadius: '8px',
                color: 'initial',
                padding: '18px 33px 18px 16px'}}
                className="form-control"
                placeholder={`${Translate[lang]?.search_by} I.D, ${Translate[lang]?.name}`}
                value={search}
                onChange={e=> setSearch(e.target.value)} 
            />
            <div className="flaticon-381-search-2"
              style={{position: 'absolute',zIndex:'99', right: lang === 'en' && '16px', left: lang === 'ar' && '16px', top: '50%', transform: 'translate(0, -50%)'}}
            ></div>
          </div>
            { <Button variant="primary" className='me-2 h-75' onClick={()=> navigate('/variant/add-variant')}>
             {Translate[lang].add} {Translate[lang].variant}
          </Button>}
          </div>
        <Card>
            <Card.Body className={`${hasData === 0 && 'text-center'} `}>
              {loading && <div style={{height: '300px'}}>
                <Loader />
              </div>}
              {(hasData === 1 && !loading) && <Table responsive>
                <thead>
                  <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang].name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang].variant}</strong>
                    </th>
                    {/* <th>
                      <strong>STATUS</strong>
                    </th> */}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* {variant?.map((item, index)=>{
                    return <CardItem 
                    key= {index}
                    index= {index}
                    item={item}
                    setShouldUpdate={setShouldUpdate}
                    shouldUpdate={shouldUpdate}
                    />
                  })} */}
                </tbody>
              </Table>}

              {hasData === 0 && <NoData />}

              {/* <Pagination
                  setData={setVariant}
                  service={variantService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
                /> */}
            </Card.Body>
          </Card>
        </>
    )
}
export default Variant;
