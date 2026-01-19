import ProtectedRoute from "@/components/shared/auth/ProtectedRoute";
import DashboardContent from "@/components/dashboard/DashboardContent";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <Header />
            <main className="flex-1 pt-[104px] lg:pt-[192px] pb-12 lg:pb-30">
                <DashboardContent />
            </main>
            <Footer className="overflow-hidden" />
        </ProtectedRoute>
    );
}
