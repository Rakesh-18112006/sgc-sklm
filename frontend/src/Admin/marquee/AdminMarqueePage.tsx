import AdminMarqueeForm from "./AdminMarqueeForm";
import AdminMarqueeList from "./AdminMarqueeList";

export default function AdminMarqueePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Marquee Message Panel
      </h1>
      <AdminMarqueeForm />
      <AdminMarqueeList />
    </div>
  );
}
