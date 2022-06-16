import { RegistrationForm } from "../components/RegistrationForm";
import React, { useState, useEffect } from 'react';
import { AuthorizationForm } from "../components/AuthorizationForm";

const Authorization = () => {
  return (
    <></>
  )
}

const Index = () => {

  const [isRegisrationMode, setIsRegisrationMode] = useState(true)

  return (
    <>{isRegisrationMode ? <RegistrationForm /> : <AuthorizationForm />}

    </>

  );
};


export default Index;