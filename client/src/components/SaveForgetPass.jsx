import React ,{useState} from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"


function SaveForgetPass() {
    const navigate = useNavigate()
   const {id} = useParams()

    const[input,setInput] = useState({
        
        newPassword:"",
        confirmPassword:""
    })
  
    const handleSubmit = async(e)=>{

        e.preventDefault()
        try {
          const result = await axios.post(`http://localhost:9000/api/reset-password/${id}`,input)
          if(result){
            alert(result.data.msg)
            navigate("/login")
            
          
         
          } else{
            alert(result.data.msg)
          }
        } catch (error) {
          alert("Some error occured")
        }
   

    }
    
  return (
    <>
  
   
<section class="vh-100" style={{backgroundColor:"#eee"}}>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{borderRadius:25}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Change Your Password</p>

                <form onSubmit={handleSubmit} class="mx-1 mx-md-4">

                

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example3c" class="form-control" name="newPassword" value={input.newPassword} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} />
                      <label class="form-label" for="form3Example3c">New Password</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" class="form-control" name="confirmPassword" value={input.confirmPassword} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} />
                      <label class="form-label" for="form3Example4c">Confirm Password</label>
                    </div>
                  </div>

                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button  type="submit" class="btn btn-primary btn-lg">Change Password</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </>
  );
}

export default SaveForgetPass ;