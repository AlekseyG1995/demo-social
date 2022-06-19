import { RegistrationForm } from "../components/RegistrationForm";
import React from 'react';
import { AuthorizationForm } from "../components/AuthorizationForm";
import { useToggle } from "../hooks/useToggle";

const Index = () => {
  const [signMode, toggleSignMode] = useToggle(true)

  return (
    <>
      {signMode ?
        <RegistrationForm toggleSignMode={toggleSignMode} /> :
        <AuthorizationForm toggleSignMode={toggleSignMode} />}
    </>
  );
};

export default Index;