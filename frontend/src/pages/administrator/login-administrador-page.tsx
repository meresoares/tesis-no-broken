// export default LoginAdmin;
// login-administrador-page.tsx

import React from 'react';
import loginImage from '../../images/img-login.webp';
import '../../styles/estilo.css';
import Login from '../../components/login-component';

const LoginAdmin: React.FC = () => {

  return (
    <section className="login-container">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src={loginImage} alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <Login isAdmin={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginAdmin;
