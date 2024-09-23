export default function LogoutButton({ setIsAuthorized, setUser, className }) {
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsAuthorized(false);
    setUser(null);
  };

  return (
    <button className={className} onClick={handleLogout}>
      Logout
    </button>
  );
}
