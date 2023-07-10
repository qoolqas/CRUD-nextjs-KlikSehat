import AddDoctor from "./addDoctor";
import DeleteDoctor from "./deleteDoctor";
import UpdateDoctor from "./updateDoctor";

type Data = {
  id: number;
  title: string;
  description: string;
  type: string;
  created_at: string;
  foto: string;
};

async function getDoctor() {
  const res = await fetch('http://127.0.0.1:5000/api/mahasiswa', {cache:'no-store'});
  return res.json();
}

export default async function DoctorList() {
  const { data } = await getDoctor();
  const doctor: Data[] = data;
  const filteredData = doctor.filter((list) =>{
    return list.type == `dokter`
  });
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddDoctor />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Dokter</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((doctor, index) => (
            <tr key={doctor.id}>
              <td>{index + 1}</td>
              <td><img src={doctor.foto} width="75"/></td>
              <td>{doctor.title}</td>
              <td>{doctor.description}</td>
              <td className="flex">
                <div className="mr-1">
                  <UpdateDoctor {...doctor} />
                </div>

                <DeleteDoctor {...doctor} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}