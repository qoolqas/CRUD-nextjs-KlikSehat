"use client";

import axios from 'axios';
import { useState } from "react";
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
export default function DeleteProduct(medicine: Data) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(id: number) {
    setIsMutating(true);

    connection.delete(`/${id}`)
        .then(response => {
          console.log('Data berhasil dihapus:', response.data);
        })
        .catch(error => {
          console.error('Gagal menghapus data:', error);
    })

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete {medicine.title} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(medicine.id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}