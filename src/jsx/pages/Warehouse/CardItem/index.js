import { useEffect, useState } from "react";
import { Badge, Dropdown, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Translate } from "../../../Enums/Tranlate";
import DeleteModal from "../../../common/DeleteModal";

const CardItem = ({ item, index, setShouldUpdate }) => {
  const [status, setStatus] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  // const adminService = new AdminService();
  const Auth = useSelector((state) => state.auth?.auth);
  const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);
  const lang = useSelector((state) => state.auth?.lang);


  return (
    <tr key={index}>
      <td>
        <strong>{item?.id}</strong>
      </td>
      <td>{item?.name}</td>
      <td>{item?.working_hour}</td>
      <td>{item?.location}</td>
      <td>{item?.kepper}</td>

      <td>
        {<Dropdown>
            <Dropdown.Toggle className="light sharp i-false">
              <i className="la la-ellipsis-v" style={{ fontSize: "27px" }}></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() =>
                  navigate(`/admins/edit-admin/${item.id}/${item?.f_name}`, {
                    state: { edit: true, id: item.id, item: item },
                  })
                }
              >
                {Translate[lang]?.edit}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDeleteModal(true)}>
                {Translate[lang]?.delete}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>}
      </td>
      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          titleMsg={item?.f_name}
          deletedItem={item}
          // modelService={adminService}
          setShouldUpdate={setShouldUpdate}
          onCloseModal={setDeleteModal}
        />
      )}
    </tr>
  );
};
export default CardItem;
