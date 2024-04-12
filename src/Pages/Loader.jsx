import HashLoader from "react-spinners/HashLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

const Loader=({isLoading})=>{
    return(
        <div style={{display:'flex', justifyContent:'center',alignItems:'center',width:'100vw',height:'100vh',backgroundColor:' #131324'}}>
             <HashLoader
 
        color="#d63636"
        loading={isLoading}
        cssOverride={override} 
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
            
       </div>
       
    )
    
}

export default Loader;