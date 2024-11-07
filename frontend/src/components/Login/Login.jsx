import './Login.css';

function Login() {
    return (
      <>
      <div className="login-container">
    <div className="login-content">
        <h2 className='ttle'>BIENVENIDO/A DE VUELTA</h2>
        <button className='close-btn'>X</button>
        <label>EMAIL</label>
        <input type="email" id="email" placeholder="Enter Your Email..." />
        <label >CONTRASEÑA</label>
        <input type="password" id="password" placeholder="Enter Your Password..." />

        <div className="options">
            <label><input type="checkbox" /> Remember Me</label>
            <a href="#" className="forgot-password">Forgot Password?</a>
        </div>

        <button className="login-button">Iniciar Sesión</button>
        
        <p className="register-text">¿Aún no tienes una cuenta? <a href="#" className="register-link">REGISTRATE</a></p>
    </div>
</div>

      </>
    )
  }
  
  export default Login;