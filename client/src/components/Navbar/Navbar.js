import React from 'react'
import './styles.css';
function Navbar() {
  return (
    <div id='container'>
        <div id='x'>
        <svg fill="none" width="4.9vh" height="4.9vh" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
        <path fill="#F55533" fill-rule="evenodd" clip-rule="evenodd" d="M35 0H0V15.4412C0 23.1899 4.78063 30.1364 12.0191 32.905L17.5 35L22.9809 32.905C30.2194 30.1364 35 23.1899 35 15.4412V0ZM24.7059 12.3529C24.7059 16.3319 21.4797 19.5588 17.5 19.5588C13.5203 19.5588 10.2941 16.3319 10.2941 12.3529C10.2941 8.37402 13.5203 5.14706 17.5 5.14706H24.7059V12.3529ZM17.5 15.4412C19.2056 15.4412 20.5882 14.0579 20.5882 12.3529C20.5882 10.648 19.2056 9.26471 17.5 9.26471C15.7944 9.26471 14.4118 10.648 14.4118 12.3529C14.4118 14.0579 15.7944 15.4412 17.5 15.4412ZM10.2941 25.7353C10.2941 23.4613 12.1377 21.6176 14.4118 21.6176H24.7059C24.7059 23.8916 22.8623 25.7353 20.5882 25.7353H10.2941Z"></path>
        </svg>
        <div style={{paddingLeft:"10px"}}>Gradious</div>
        </div>
        <button id='logoutButton'>Logout</button>
    </div>
  )
}

export default Navbar;