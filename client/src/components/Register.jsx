import axios from "axios"
import React ,{useState} from "react"
import { useNavigate } from "react-router-dom"


function Register() {
    const navigate = useNavigate()
    const[input,setInput] = useState({
        name:"",
        email:"",
        password:""
    })
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
          const result = await axios.post("http://localhost:9000/api/users/register",input)
          if(result){
          alert(result.data.msg)
          if(result.data.msg==="Registration done successfully"){
            
            navigate("/")
          }
         
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

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form onSubmit={handleSubmit} class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" class="form-control" name="name" value={input.name} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} />
                      <label class="form-label" for="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" class="form-control" name="email" value={input.email} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} />
                      <label class="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" class="form-control" name="password" value={input.password} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} />
                      <label class="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <a style={{fontSize:14,display:"flex",flexDirection:"column",textDecoration:"none"}} href="/login">Already have an account? Register Here</a>
                    <button  type="submit" class="btn btn-primary btn-lg">Register</button>
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

export default Register;