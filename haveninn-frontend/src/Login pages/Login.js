import React, { Component } from 'react'
// import json  from 'react-router-dom'

 class Login extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         email:null,
         password:null,
         login:false,
         store:null
      }
    }
    login(){
        fetch('https://localhost:44331/api/UserLogin',{
            method:"POST",
            body:this.state

        }).then(res=>{
          console.log(res)
        }).then((response)=>{
            response.json().then((result)=>{
                console.warn("result",result);
                localStorage.setItem('login',JSON.stringify({
                    login:true,
                    token:result.token
                }))
            })
        })
    }
  render() {
    return (
     <div>
        <h3>Login</h3>
        <div>
            <input type="text" onChange={(event)=>{this.setState({email:event.target.value})}} /><br/><br/>
            <input type="password" onChange={(event)=>{this.setState({password:event.target.value})}} /><br/><br/>
            <button onClick={()=>{this.login()}}>Login</button>
        </div>
     </div>
    )
  }
}

export default Login