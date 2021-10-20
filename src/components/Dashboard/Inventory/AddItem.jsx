import IPcamera from "../../../Assets/Images/ipCamera.png";
import React, { useContext, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  AddItemContainer,
  ImageInput,
  ImageInputArea,
  InputDiv,
  Label,
  SubmitButton,
  UploadButton,
} from "../../../styles/styles";
import { UserContext } from "../../../context/UserProvider";
import { connect } from "react-redux";
import { setShow } from "../../../Redux/actions/renderActions";
import TopbarAtom from "../../../atoms/TopbarAtom";
import InputAtom from "../../../atoms/InputAtom";

const AddItem = ({ setShow, show }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [imgFile, setImgFile] = useState("");
  const [docFile, setDocFile] = useState("");
  const [editImage, setEditImage] = useState("");
  const hiddenImageInput = useRef(null);
  const hiddenDocInput = useRef(null);
  const topbarRef = useRef(null);
  const SubmitButtonRef = useRef(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // HANDLE ADD PRODUCT SUBMIT
  const onSubmit = (data) => {
    console.log(data, { imgFile }, { docFile });
    // const productsRef = ref(db, "inventory/products");
    // productsRef.child(`${data.productNo}`).update({
    //   date: data.date,
    //   name: data.item_name,
    //   available: data.item_quantity,
    //   poNo: data.po_number,
    //   receivedDate: data.received_date,
    //   remarks: data.remarks,
    //   supplier: data.supplier,
    //   id: data.productNo,
    //   condition: data.condition,
    //   lastEditedBy: user.email,
    //   reserved: data.reserved ? data.reserved : 0,
    //   onHand: data.onHand ? data.onHand : 0,
    // });
    // if (imgFile) {
    //   const uploadTask = bucket.ref(`/pictures/${imgFile.name}`).put(imgFile);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapShot) => {},
    //     (err) => {
    //       console.log(err);
    //     },
    //     () => {
    //       bucket
    //         .ref("pictures")
    //         .child(imgFile.name)
    //         .getDownloadURL()
    //         .then((fireBaseUrl) => {
    //           console.log(fireBaseUrl);
    //           productsRef.child(`${data.productNo}`).update({
    //             photos: fireBaseUrl,
    //           });
    //         });
    //     }
    //   );
    // }
    // if (docFile) {
    //   const uploadTask = bucket.ref(`/pictures/${docFile.name}`).put(docFile);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapShot) => {},
    //     (err) => {
    //       console.log(err);
    //     },
    //     () => {
    //       bucket
    //         .ref("pictures")
    //         .child(docFile.name)
    //         .getDownloadURL()
    //         .then((fireBaseUrl) => {
    //           const docsRef = ref(
    //             db,
    //             `inventory/products/${data.productNo}/docs`
    //           );
    //           docsRef.push({
    //             name: docFile.name,
    //             url: fireBaseUrl,
    //             date: moment().format("DD-MM-YY"),
    //           });
    //         });
    //     }
    //   );
    // }
    // console.log("new product added successfully");
    // setShow("table");
    // reset();
  };
  const user = useContext(UserContext);

  const handleClick = (param) => {
    if (param === "image") {
      hiddenImageInput.current.click();
    } else {
      hiddenDocInput.current.click();
    }
  };
  const handleImgInputChange = (e) => {
    const imgFileUploaded = e.target.files[0];
    setImgFile(imgFileUploaded);
    // setImgFileError("");
  };

  const [files, setfiles] = useState([]);

  // const handleEdit = async () => {
  //   console.log(selectedItems);
  //   const product = selectedItems[0];
  //   reset({
  //     date: product.date,
  //     item_name: product.name,
  //     item_quantity: product.available,
  //     po_number: product.poNo,
  //     received_date: product.receivedDate,
  //     remarks: product.remarks,
  //     supplier: product.supplier,
  //     productNo: product.id,
  //     condition: product.condition,
  //     reserved: product.reserved,
  //     onHand: product.onHand,
  //   });
  //   let files = [];
  //   if (product.docs) {
  //     Object.keys(product.docs).map((obj) => {
  //       files.push(product.docs[obj]);
  //     });
  //   }
  //   console.log(files);
  //   setfiles(files);
  //   setEditImage(product.photos);
  //   setShow("addItem");
  //   setSelectedItems([]);
  // };

  return (
    <div>
      <TopbarAtom
        topRef={topbarRef}
        buttonRef={SubmitButtonRef}
        buttonTitle="Save"
        title="Add Item"
        goBack="inventoryTable"
      />
      <AddItemContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label style={{ width: "70%", margin: "0 auto" }}>
                  Item Image
                </Label>
                <ImageInputArea onClick={() => handleClick("image")}>
                  <ImageInput
                    className="img-fluid"
                    src={editImage === "" ? IPcamera : editImage}
                    alt=""
                  />
                </ImageInputArea>
                <div className="text-center">
                  <UploadButton
                    type="transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick("image");
                    }}
                  >
                    {imgFile ? imgFile.name : "+ Upload Image"}
                  </UploadButton>
                  <input
                    ref={hiddenImageInput}
                    onChange={handleImgInputChange}
                    style={{ display: "none" }}
                    type="file"
                  />
                </div>
              </InputDiv>
            </Col>
            <Col md={9} xs={12} className="" style={{ paddingRight: "30px" }}>
              <Row className="w-100  m-0">
                <InputAtom
                  register={register}
                  errors={errors}
                  label="Item Name"
                  required={true}
                  id="item_name"
                  placeholder=""
                  defaultValue=""
                  md={6}
                />
                <InputAtom
                  register={register}
                  errors={errors}
                  label="Code"
                  required={true}
                  id="code"
                  placeholder=""
                  defaultValue=""
                  md={4}
                />
              </Row>
            </Col>
          </Row>
          <div className="text-center my-lg-5 d-none">
            <SubmitButton type="submit" value="Save" ref={SubmitButtonRef} />
          </div>
        </form>
      </AddItemContainer>
    </div>
  );
};
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setShow: setShow,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
