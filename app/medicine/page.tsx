import AddMedicine from "./addMedicine";
import DeleteMedicine from "./deleteMedicine";
import UpdateMedicine from "./updateMedicine";

type Data = {
  id: number;
  title: string;
  description: string;
  type: string;
  created_at: string;
  foto: string;
};

async function getMedicine() {
  const res = await fetch('http://127.0.0.1:5000/api/mahasiswa', {cache:'no-store'});
  return res.json();
}

export default async function MedicineList() {
  const { data } = await getMedicine();
  const medicine: Data[] = data;
  const filteredData = medicine.filter((list) =>{
    return list.type == `obat`
  });
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddMedicine />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Medicine</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((medicine, index) => (
            <tr key={medicine.id}>
              <td>{index + 1}</td>
              <td><img src={medicine.foto} width="75"/></td>
              <td>{medicine.title}</td>
              <td>{medicine.description}</td>
              <td className="flex">
                <div className="mr-1">
                  <UpdateMedicine {...medicine} />
                </div>

                <DeleteMedicine {...medicine} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}