import { getAllRoutesDataCombined } from "@/actions/transaction.action";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header/Header";


async function getData() {
  const data = (await getAllRoutesDataCombined("Mar")).data;
  return data;
}
export default async function Home() {
  const initialData = await getData();
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-start-3 col-span-8"><Header /></div>
        <Dashboard initData={initialData} />
      </div>
    </>
  );
}
