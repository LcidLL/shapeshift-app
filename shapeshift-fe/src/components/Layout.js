import NavBar from "./NavBar";

function Layout({children}){
  return(
     <div className="h-screen bg-neutral-bg flex text-neutral-text">
      {/* Navbar stays fixed on the left */}
      <NavBar />

      {/* Page content (your other components) */}
      <main className="flex-1 p-6 bg-neutral-bg overflow-y-hidden">
        {children}
      </main>
    </div>
  )
}

export default Layout;