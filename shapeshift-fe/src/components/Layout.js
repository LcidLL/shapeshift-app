import NavBar from "./NavBar";

function Layout({children}){
  return(
     <div className="flex h-screen">
      {/* Navbar stays fixed on the left */}
      <NavBar />

      {/* Page content (your other components) */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default Layout;