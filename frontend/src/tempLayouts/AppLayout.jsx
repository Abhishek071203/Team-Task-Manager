import Sidebar from "../components/Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}   