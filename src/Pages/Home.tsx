import { useEffect } from "react";

function Home() {

  useEffect(() => {
    function SetTitle() {
      document.title = "Home"
    }
    SetTitle();
  }, []);
  
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <p className="text-xl">
        Home
      </p>
    </div>
  )
}

export default Home