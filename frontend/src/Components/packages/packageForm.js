import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import AddHighLightModal from "../modal/AddHighLightModal";
import { FormInput, FormTextAreaField } from "../input/FormInput";
import { useFormik } from "formik";
import axios from "axios";

const PackageForm = () => {
  const [openHighLight, setHighLight] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      country: "",
      continent: "",
      price: "",
      duration: "",
      images: "",
      highlights: "",
      overview: "",
      itinerary: "",
      included: "",
      excluded: "",
    },

    onSubmit: async (
      {
        title,
        country,
        continent,
        price,
        duration,
        highlights,
        itinerary,
        included,
        excluded,
        overview,
        images,
      },
      actions
    ) => {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("images[]", images[i]);
      }
      formData.append("title", title);
      formData.append("country", country);
      formData.append("overview", overview);
      formData.append("continent", continent);
      formData.append("price", price);
      formData.append("duration", duration);
      formData.append("highlights", highlights);
      formData.append("itinerary", itinerary);
      formData.append("included", included);
      formData.append("excluded", excluded);

      await axios.post(`${process.env.REACT_APP_URL}/trip`, formData);
      console.log(formik.values);
      actions.resetForm();
      setSelectedFile([]);
    },
  });

  const onfileChange = () => {
    formik.setFieldValue("images", selectedFile);
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
      formik.setFieldValue("images", acceptedFiles);
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
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-3 gap-5 px-4">
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Title</h1>
          <FormInput
            name="title"
            formik={formik}
            placeholder="Enter Title..."
          />
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Country</h1>
          <FormInput
            name="country"
            formik={formik}
            placeholder="Enter Title..."
          />
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Price</h1>
          <FormInput
            name="price"
            formik={formik}
            placeholder="Enter Price..."
          />
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Continent</h1>
          <FormInput name="continent" formik={formik} />
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Highlights</h1>
          <button
            onClick={() => setHighLight(true)}
            className="border-2 border-black border-dashed  rounded-md px-[10px] py-1 w-full h-[45px] "
          >
            Add Highlights
          </button>

          {openHighLight && (
            <AddHighLightModal formik={formik} setHighLight={setHighLight} />
          )}
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Itinerary</h1>
          <button className="border-2 border-black border-dashed  rounded-md px-[10px] py-1 w-full h-[45px] ">
            Add itinerary
          </button>
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Duration</h1>
          <FormInput name="duration" formik={formik} />
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Included</h1>
          <button className="border-2 border-black border-dashed  rounded-md px-[10px] py-1 w-full h-[45px] ">
            Add included
          </button>
        </div>
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">Excluded</h1>
          <button className="border-2 border-black border-dashed  rounded-md px-[10px] py-1 w-full h-[45px] ">
            Add Excluded
          </button>
        </div>
      </div>
      <div className="w-full mt-5 px-4">
        <h1 className="text-[16px] font-[700] mb-3">Overview</h1>
        <FormTextAreaField name="overview" formik={formik} />
      </div>
      <div className="w-full mt-5 px-4">
        <h1 className="text-[16px] font-[700] mb-3">Images</h1>
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
        <div className="text-[red]">
          {formik.touched["images"] && formik.errors["images"]
            ? formik.errors["images"]
            : null}
        </div>
      </div>
      <div className="flex flex-wrap justify-around mt-5 px-4">
        {selectedImages}
      </div>
      <div className="flex justify-end py-5 px-4">
        <button
          className="bg-[#2266D1] px-5 py-2 rounded-md text-white"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PackageForm;
