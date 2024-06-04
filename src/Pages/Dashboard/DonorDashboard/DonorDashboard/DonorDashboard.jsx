import useAuth from "../../../../Hooks/useAuth";

const DonorDashboard = () => {
    const { user } = useAuth()
    return (
        <div>
            <h1 className="text-3xl font-semibold">Welcome to <span className="text-orange-600">{user.displayName}</span></h1>
        </div>
    );
};

export default DonorDashboard;