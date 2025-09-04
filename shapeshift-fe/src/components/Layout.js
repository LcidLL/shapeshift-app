import NavBar from "./NavBar";

function Layout({children}){
  return(
     <div className="h-screen bg-neutral-bg flex text-neutral-text">
      {/* Navbar stays fixed on the left */}
      <NavBar />

      {/* Page content (your other components) */}
      <main className="flex-1 flex flex-col p-6 bg-neutral-bg h-full">
        {children}
      </main>
    </div>
  )
}

export default Layout;