"use client";

import axios from 'axios';
import { SyntheticEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const connection = axios.create({
  baseURL: "http://127.0.0.1:5000/api/mahasiswa"
}); 
export default function AddProduct() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);
  const [foto, setFoto] = useState(null);
  const [isMutating, setIsMutating] = useState(false);

  const currentDate = new Date();

  const router = useRouter();
  
  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', 'dokter');
    formData.append('created_at', currentDate.toISOString());
    formData.append('foto', foto);
    console.log(formData);

    setIsMutating(true);
    connection
    .post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });    

    setIsMutating(false);

    setId("");
    setTitle("");
    setDescription("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Add New Doctor
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Doctor</h3>
          <form onSubmit={handleSubmit}>
          <div className="form-control">
              <label className="label font-bold">ID</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="input w-full input-bordered"
                placeholder="ID"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Title"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Description"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Masukan Foto Dokter</label>
              <input
                type="file"
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFoto(file);
                }}
                className="input w-full input-bordered"
                placeholder="Image"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}