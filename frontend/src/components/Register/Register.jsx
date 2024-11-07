import './Register.css';

function Register() {
  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="ttle">CREA TU CUENTA</h2>
        <button className="close-btn">X</button>

        <div className="name-surname">
          <div className="input-group">
            <label>Nombre</label>
            <input type="text" placeholder="Nombre..." />
          </div>
          <div className="input-group">
            <label>Apellido</label>
            <input type="text" placeholder="Apellido..." />
          </div>
        </div>

        <div className="input-group">
          <label>Nombre De Usuario</label>
          <input type="text" placeholder="Nombre de Usuario..." />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Correo electrónico..." />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input type="password" placeholder="Contraseña..." />
        </div>

        <div className="input-group">
          <label>Confirmar Contraseña</label>
          <input type="password" placeholder="Confirmar Contraseña..." />
        </div>

        <button className="login-button">Registrate</button>
        <p className="register-text">
          ¿Ya tienes una cuenta? <a href="#" className="register-link">Inicia Sesión</a>
        </p>
      </div>
    </div>
  );
}

export default Register;

