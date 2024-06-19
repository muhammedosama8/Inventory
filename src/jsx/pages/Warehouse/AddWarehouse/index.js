import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Select from "react-select";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader";
import { Translate } from "../../../Enums/Tranlate";

const AddWarehouse = () => {
  const [product, setProduct] = useState({
    name: "",
    working_hour: "",
    location: "",
    kepper: "",
  });

  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [loading, setLoadning] = useState(false);
  const [files, setFiles] = useState([{}, {}, {}, {}, {}]);
  const navigate = useNavigate();
  const location = useLocation();
  // const productsService = new ProductsService();
  const Auth = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.auth.lang);

  const handlerText = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submit = () => {
    setLoadning(true);
    let data = {
    };

    // if (!!id) {
    //   productsService.update(id, data)?.then((res) => {
    //     if (res.data?.status === 200) {
    //       toast.success("Product Updated Successfully");
    //       navigate(`/products/${product?.id}`, {state: product?.code})
    //       // setConfirm(true);
    //       // setProduct({
    //       //   ...product,
    //       //   images: [
    //       //     { src: "" },
    //       //     { src: "" },
    //       //     { src: "" },
    //       //     { src: "" },
    //       //     { src: "" },
    //       //   ],
    //       // });
    //     }
    //     setLoadning(false);
    //   });
    // } else {
    //   productsService.create(data)?.then((res) => {
    //     if (res.data?.status === 201) {
    //       setConfirm(true);
    //       toast.success("Product Added Successfully");
    //     }
    //     setLoadning(false);
    //   });
    // }
  };

  if (Auth.showLoading) {
    return (
      <Card className="p-4" style={{ minHeight: "30rem" }}>
        <Loader />
      </Card>
    );
  }
  return (
    <Card className="p-4">
      <AvForm onValidSubmit={submit} className="add-product">
        <Row>
          <Col md={6} className="mb-3">
            <AvField
              label={`${Translate[lang]?.name}`}
              type="text"
              placeholder={Translate[lang]?.name}
              bsSize="lg"
              name="name"
              validate={{
                required: {
                  value: true,
                  errorMessage: Translate[lang].field_required,
                },
                pattern: {
                  value: "/^[A-Za-z0-9 ]+$/",
                  errorMessage: `English format is invalid`,
                },
              }}
              value={product.name}
              onChange={(e) => handlerText(e)}
            />
          </Col>
          <Col md={6} className="mb-3">
            <AvField
              label={`${Translate[lang]?.working_hour}`}
              type="number"
              placeholder={Translate[lang]?.working_hour}
              value={product.working_hour}
              name="working_hour"
              validate={{
                required: {
                  value: true,
                  errorMessage: Translate[lang].field_required,
                },
              }}
              onChange={(e) => handlerText(e)}
            />
          </Col>
          <Col md={6} className="mb-3">
            <AvField
              label={`${Translate[lang]?.location}`}
              type="text"
              placeholder={Translate[lang]?.location}
              value={product.location}
              name="location"
              validate={{
                required: {
                  value: true,
                  errorMessage: Translate[lang].field_required,
                },
              }}
              onChange={(e) => handlerText(e)}
            />
          </Col>
          <Col md={6} sm={6} className="mb-3">
            <label className="text-label">{Translate[lang]?.warehouse_keeper}</label>
            <Select
              value={product.kepper}
              name="warehouse_keeper"
              placeholder={Translate[lang]?.select}
              options={[]}
              onChange={(e) =>
                setProduct({
                  ...product,
                  kepper: e,
                })
              }
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between mt-4">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/warehouse")}
          >
            {Translate[lang]?.cancel}
          </Button>
          <Button variant="primary" loading={loading} type="submit">
            {Translate[lang]?.submit}
          </Button>
        </div>
        </AvForm>
    </Card>
  );
};

export default AddWarehouse;
