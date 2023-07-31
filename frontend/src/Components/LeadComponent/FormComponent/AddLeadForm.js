import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { AiFillMinusCircle } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import AddHighLightModal from "../../modal/AddHighLightModal";

const FormComponent = () => {
  const [test, setTest] = useState(false);
  const [openHighLight, setHighLight] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);

  const onfileChange = () => {
    Formik.setFieldValue("images", selectedFile);
  };

  const addStudentApplication = (values) => {
    console.log(values);
    axios
      .post("http://localhost:3000/api/v1/leadform", values)
      .then((res) => {
        toast.success("New applicant added");
        setTimeout(() => {
          window.location.href = "/applicants";
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setSelectedFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      Formik.setFieldValue("images", acceptedFiles);
    },
  });

  const selectedImages = selectedFile?.map((file, i) => (
    <div key={i}>
      <img
        className="rounded-[8px] w-[200px] h-[200px]"
        src={file.preview}
        alt=""
      />
    </div>
  ));

  return (
    <>
      {/* Main container */}
      <div className="w-full">
        <Formik
          initialValues={{
            firstName: "hello",
            middleName: "",
            lastName: "",
            temporaryAddress: "",
            permanentAddress: "",
            gender: "",
            dateOfBirth: "",
            contactNumber: "",
            email: "",
            images: "",
            highlights: "",
            // uploadCitizenship: '',
            // uploadPassword: '',
          }}
          onSubmit={addStudentApplication}
        >
          {({ values, setFieldValue }) => (
            <Form className="w-full pr-2 flex flex-col gap-7">
              {/* Personal Details */}

              <div className="w-full grid grid-cols-3 gap-3">
                {/* FIrst Name */}
                <div className="w-full flex flex-col gap-2">
                  <label className="w-full font-poppins text-sm">
                    Tour Name
                  </label>
                  <Field
                    required
                    name="firstName"
                    placeholder="Your firstname here *"
                    className="w-full p-3 rounded-md outline-primary-blue font-poppins text-xs border-[1px]"
                  />
                </div>
                {/* MIddle Name */}
                <div className="w-full flex flex-col gap-2">
                  <label className="w-full font-poppins text-sm">
                    Location Name
                  </label>
                  <Field
                    name="middleName"
                    placeholder="Your middlename here"
                    className="w-full p-3 rounded-md outline-primary-blue font-poppins text-xs border-[1px]"
                  />
                </div>
                {/* Last Name */}
                <div className="w-full flex flex-col gap-2">
                  <label className="w-full font-poppins text-sm">Price</label>
                  <Field
                    name="lastName"
                    placeholder="Your lastname here *"
                    className="w-full p-3 rounded-md outline-primary-blue font-poppins text-xs border-[1px]"
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-3 gap-3">
                {/* FIrst Name */}
                <div className="w-full flex flex-col gap-2">
                  <label className="w-full font-poppins text-sm">
                    Continent
                  </label>
                  <Field
                    required
                    name="firstName"
                    placeholder="Your firstname here *"
                    className="w-full p-3 rounded-md outline-primary-blue font-poppins text-xs border-[1px]"
                  />
                </div>
                {/* MIddle Name */}
                <div className="w-full flex flex-col gap-2">
                  <label className="w-full font-poppins text-sm">
                    Highlights
                  </label>
                  <button
                    onClick={() => setHighLight(true)}
                    className="border-2 border-black border-dashed h-full rounded-md"
                  >
                    Add Highlights
                  </button>

                  {openHighLight && (
                    <AddHighLightModal
                      values={values}
                      setHighLight={setHighLight}
                    />
                  )}
                </div>
                {/* Last Name */}
                <div className="w-full flex flex-col gap-2">
                  <label className="w-full font-poppins text-sm">Itinary</label>
                  <button className="border-2 border-black border-dashed h-full rounded-md">
                    Add Itinary
                  </button>
                </div>
              </div>
              <div className="w-full grid grid-cols-3 gap-3">
                <div className="w-full flex flex-col gap-2">
                  <label className="w-full font-poppins text-sm">
                    Duration
                  </label>
                  <Field
                    required
                    name="firstName"
                    placeholder="Your firstname here *"
                    className="w-full p-3 rounded-md outline-primary-blue font-poppins text-xs border-[1px]"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="w-full font-poppins text-sm">
                    Included
                  </label>
                  <Field
                    required
                    name="firstName"
                    placeholder="Your firstname here *"
                    className="w-full p-3 rounded-md outline-primary-blue font-poppins text-xs border-[1px]"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="w-full font-poppins text-sm">
                    Excluded
                  </label>
                  <Field
                    required
                    name="firstName"
                    placeholder="Your firstname here *"
                    className="w-full p-3 rounded-md outline-primary-blue font-poppins text-xs border-[1px]"
                  />
                </div>
              </div>
              <div>
                <div className="w-full flex flex-col gap-2">
                  <label className="w-full font-poppins text-sm">
                    Overview
                  </label>
                  <Field
                    required
                    as="textarea"
                    name="firstName"
                    placeholder="Your firstname here *"
                    className="w-full p-3 rounded-md outline-primary-blue font-poppins text-xs border-[1px]"
                  />
                </div>

                <div>
                  <label className="my-3">Images</label>

                  <div
                    {...getRootProps()}
                    className="flex justify-center items-center bg-[#FAFAFA] w-full border-[1px] border-dashed border-[#686868] h-[215px] rounded-[8px] cursor-pointer"
                  >
                    <input
                      name="images"
                      {...getInputProps()}
                      onChange={onfileChange}
                      type="file"
                    />
                    <label
                      className="bg-[#FFFFFF] p-[10px] rounded-[8px] shadow-allShadow"
                      htmlFor="file-input"
                    >
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>Drop files here to upload</p>
                      )}
                    </label>
                  </div>
                </div>
                <div className="flex flex-wrap justify-around my-5">
                  {selectedImages}
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default FormComponent;
