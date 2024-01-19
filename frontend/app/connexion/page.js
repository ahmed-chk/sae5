'use client';

import React, { useState } from "react";
import AuthService from '@/app/services/auth.service';

function App() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login(mail, mdp);
      console.log(response);
      // Gérez la réponse ici
    } catch (error) {
      console.error('Erreur de connexion :', error);
      // Gérez les erreurs ici
    }
  };

  const [mail, setMail] = useState('');
  const [mdp, setMdp] = useState('');

  return (
    <div>
      <form action="" id="login" method="post" onSubmit={handleSubmit}>
        <h1>Connexion :</h1>
        <br></br>
        <p className="item">
          <label htmlFor="mail"> Mail </label>
          <input
            type="email"
            name="mail"
            id="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </p>
        <p className="item">
          <label htmlFor="mdp"> Mot de passe </label>
          <input
            type="password"
            name="mdp"
            id="mdp"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
          />
        </p>
        <p className="item">
          <input type="submit" value="Login" />
        </p>
      </form>
    </div>
  );
}

export default App;
