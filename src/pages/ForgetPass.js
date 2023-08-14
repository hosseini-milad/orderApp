import { useEffect, useState } from "react";
import env from "../env";

function ForgetPass(){
    const otp = window.location.pathname.split('/')[2];
    
    const [pass,setPass] = useState()
    const [showPass,setShowPass] = useState()
    const [error,setError] = useState({message:'',color:"brown"})
    useEffect(()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            },
            body:JSON.stringify({otp:otp})
          }
          //console.log(postOptions)
        0&&fetch(env.siteApi + "/auth/active-user",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            else{
                setError({message:result.message,color:"green"})
                setTimeout(()=>setError({message:'',color:"brown"}),1000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    },[])
    const changePass=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            },
            body:JSON.stringify({otp:otp,...pass})
          }
          console.log(postOptions)
        fetch(env.siteApi + "/auth/forget-password-set",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            else{
                setError({message:result.message,color:"green"})
                setTimeout(()=>window.location.href="/",1000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    }
    return(
        <div className="container">
        <div className="section-fiin registo-de-cliente">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="form-fiin form-box-style form-password">
                        <div className="section-head">
                            <h1 className="section-title">Password</h1>
                            <p className="hidden">Quer alterar a sua password atual? Insira a sua password atual e insira a sua nova password a utilizar.</p>
                        </div>
                        
                        <div className="form-field-fiin">
                            <label htmlFor="last-name">Nova Password​</label>
                            <input type={showPass===2?"input":"password"} 
                                name="lastname" id="last-name" placeholder="Nova Password"
                            onChange={(e)=>setPass(data => ({
                                ...data,
                                ...{newPass:e.target.value}
                              }))}/>
                            <span className="icon-password icon-pass"
                            onClick={()=>setShowPass(showPass===2?0:2)}></span>
                        </div>
                        <div className="form-field-fiin">
                            <label htmlFor="telefone">Confirme a sua password</label>
                            <input type={showPass===3?"input":"password"} 
                            name="confirm" id="confirm" placeholder="Confirme a sua password"
                            onChange={(e)=>setPass(data => ({
                                ...data,
                                ...{confPass:e.target.value}
                              }))}/>
                            <span className="icon-password icon-pass"
                            onClick={()=>setShowPass(showPass===3?0:3)}></span>
                        </div>
                        <div className="footer-form-fiin">
                            <button type="submit" className="btn-fiin" name="submit"
                            onClick={()=>changePass()}>Alterar</button>
                            <small className="errorSmall" style={{color:error.color}}>
                            {error.message}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default ForgetPass