import IPcamera from "../../../Assets/Images/ipCamera.png";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import { bucket, db } from "../../../firebase";
import { child, push, ref, set, update } from "@firebase/database";
import { ref as reference } from "@firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { Alert } from "@material-ui/lab";

const AddItem = ({ setShow, show, item }) => {
  console.log("🚀 ~ AddItem ~ item", { item });
  const edit = Boolean(item.info === "edit");
  const view = Boolean(item.info === "view");
  const [imgFile, setImgFile] = useState("");
  const [img, setImg] = useState("");
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
  useEffect(() => {
    edit && setImg(item.photos);
  }, []);

  // HANDLE ADD PRODUCT SUBMIT
  const onSubmit = (data) => {
    !imgFile && alert(`Choose An Image`);
    if (imgFile) {
      const storageRef = reference(bucket, `/pictures/${imgFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imgFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log("~~ error ~~", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updates = {};
            updates["inventory/items/" + data.code] = {
              ...data,
              photos: downloadURL ? downloadURL : img,
            };
            update(ref(db), updates);
            setShow("inventoryTable");
          });
        }
      );
    }
  };
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
    let reader = new FileReader();
    reader.onload = function (e) {
      setImg(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
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
        buttonTitle={!view && "Save"}
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
                <ImageInputArea onClick={() => !view && handleClick("image")}>
                  <ImageInput
                    className="img-fluid"
                    src={img ? img : edit || view ? item.photos : IPcamera}
                    alt=""
                  />
                </ImageInputArea>
                {!view && (
                  <div className="text-center">
                    <UploadButton
                      type="transparent"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick("image");
                      }}
                    >
                      {imgFile ? imgFile?.name : "+ Upload Image"}
                    </UploadButton>
                    <input
                      ref={hiddenImageInput}
                      onChange={handleImgInputChange}
                      style={{ display: "none" }}
                      type="file"
                    />
                  </div>
                )}
              </InputDiv>
            </Col>
            <Col md={9} xs={12} className="" style={{ paddingRight: "30px" }}>
              <Row className="w-100  m-0">
                <InputAtom
                  readOnly={view}
                  register={register}
                  errors={errors}
                  label="Item Name"
                  required={true}
                  id="item_name"
                  placeholder=""
                  defaultValue={edit || view ? item.item_name : ""}
                  md={edit ? 4 : 6}
                />
                <InputAtom
                  readOnly={view}
                  register={register}
                  errors={errors}
                  label="Code"
                  required={true}
                  id="code"
                  placeholder=""
                  defaultValue={edit || view ? item.code : ""}
                  md={4}
                />
                {(edit || view) && (
                  <InputAtom
                    readOnly={view}
                    register={register}
                    errors={errors}
                    label="On Hand"
                    required={true}
                    id="onHand"
                    placeholder=""
                    defaultValue={edit || view ? item.onHand : ""}
                    md={4}
                  />
                )}
              </Row>
              {(edit || view) && (
                <>
                  <Row className="w-100  m-0">
                    <Label
                      style={{
                        width: "70%",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Item Details
                    </Label>
                    <InputAtom
                      readOnly={view}
                      register={register}
                      errors={errors}
                      label="Not Working"
                      required={true}
                      id="not_working"
                      placeholder=""
                      defaultValue={edit || view ? item.not_working : ""}
                      md={4}
                    />
                    <InputAtom
                      readOnly={view}
                      register={register}
                      errors={errors}
                      label="Damaged"
                      required={true}
                      id="damaged"
                      placeholder=""
                      defaultValue={edit || view ? item.damaged : ""}
                      md={4}
                    />
                    <InputAtom
                      readOnly={view}
                      register={register}
                      errors={errors}
                      label="Missing"
                      required={true}
                      id="missing"
                      placeholder=""
                      defaultValue={edit || view ? item.missing : ""}
                      md={4}
                    />
                  </Row>
                  <Row className="w-100  m-0">
                    <Label
                      style={{
                        width: "70%",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Client Details
                    </Label>
                    <InputAtom
                      readOnly={view}
                      register={register}
                      errors={errors}
                      label="Client Count"
                      required={true}
                      id="clientCount"
                      placeholder=""
                      defaultValue={edit || view ? item.clientCount : ""}
                      md={4}
                    />
                  </Row>
                </>
              )}
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
