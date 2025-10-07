import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
    const { user } = useAuth();
    return (
        // Add this wrapper div
        <div className="page-container">
            <h1 className="page-header">My Profile</h1>
            <div className="card">
                <h3>Name: {user?.name}</h3>
                <p>Email: {user?.email}</p>
            </div>
        </div>
    );
}

export default ProfilePage;