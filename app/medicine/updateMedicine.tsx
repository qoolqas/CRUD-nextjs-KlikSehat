"use client";

import axios from 'axios';
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

const connection = axios.create({
  baseURL: "http://127.0.0.1:5000/api/mahasiswa"
});
type Data = {
  id: number;
  title: string;
  description: string;
  type: string;
  created_at: string;
  foto: string;
};

export default function UpdateProduct(medicine: Data) {
  const [title, setTitle] = useState(medicine.title);
  const [description, setDescription] = useState(medicine.description);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', medicine.type);
    formData.append('created_at', medicine.created_at);
    connection
      .put(`/${medicine.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {medicine.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">ID</label>
              <input
                type="text"
                value={medicine.id}
                className="input w-full input-bordered"
                placeholder="ID"
                disabled
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
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}