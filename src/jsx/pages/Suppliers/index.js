import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../../common/Loader";
import NoData from "../../common/NoData";
import { Translate } from "../../Enums/Tranlate";
import AddModal from "./AddModal";
import CardItem from "./CardItem";

const Suppliers = () => {
  const [data, setData] = useState([
    {id: 1, name: 'name', type: 'local', country: 'USA'},
    {id: 2, name: 'name2', type: 'international', country: 'USA'},
  ]);
  const [hasData, setHasData] = useState(1);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [search, setSearch] =useState(null)
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state?.auth.lang);
  const Auth = useSelector(state=> state.auth?.auth)
  const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

  return (
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
              style={{position: 'absolute',zIndex:'1', right: lang === 'en' && '16px', left: lang === 'ar' && '16px', top: '50%', transform: 'translate(0, -50%)'}}
            ></div>
          </div>
          <Button
              variant="primary"
              className="me-2 h-75"
              onClick={() => setAddModal(true)}
            >
              {Translate[lang]?.add} {Translate[lang]?.suppliers}
            </Button>
        </div>

      <Card>
        <Card.Body className={`${hasData === 0 && "text-center"} `}>
          {loading && (
            <div style={{ height: "300px" }}>
              <Loader />
            </div>
          )}
          {hasData === 1 && !loading && (
            <Table responsive>
              <thead>
                <tr className="text-center">
                  <th>
                    <strong>I.D</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.name}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.type}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.country}</strong>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <CardItem
                      key={index}
                      index={index}
                      item={item}
                      setShouldUpdate={setShouldUpdate}
                    />
                  );
                })}
              </tbody>
            </Table>
          )}

          {hasData === 0 && <NoData />}
        </Card.Body>
      </Card>

      {addModal && <AddModal modal={addModal} setShouldUpdate={setShouldUpdate} setModal={()=>setAddModal(false)} />}
    </>
  );
};
export default Suppliers;
