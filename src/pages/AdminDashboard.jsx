import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  return (
    <>
      <Header />
      <div className="bg-[#161515] min-h-screen pt-24 px-10 text-white flex justify-center">
        <div className="container bg-[#1e1e1e] p-8 rounded-2xl border border-[#2e2e2e] my-10">
             <h1 className="text-3xl font-bold text-[#5b5b5b] mb-4">Admin Paneli</h1>
             <p>Yönetim araçları buraya gelecek...</p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AdminDashboard;