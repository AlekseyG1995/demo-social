import React from 'react';
import { useToggle } from '../hooks/useToggle';
import { RegistrationForm } from '../components/RegistrationForm';
import { AuthorizationForm } from '../components/AuthorizationForm';

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