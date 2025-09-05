import NavBar from "./NavBar";
import { useAuth } from "../contexts/AuthContext";

function Layout({children}){
  const { user } = useAuth();
  return(
     <div className="h-screen bg-neutral-bg flex text-neutral-text">
      {/* Navbar stays fixed on the left */}
      {user && <NavBar />}

      {/* Page content (your other components) */}
      <main className="flex-1 flex flex-col p-6 bg-neutral-bg h-full">
        {children}
      </main>
    </div>
  )
}

export default Layout;