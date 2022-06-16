import { RegistrationForm } from "../components/RegistrationForm";
import React, { useState, useEffect } from 'react';
import { AuthorizationForm } from "../components/AuthorizationForm";
import { useToggle } from "../hooks/useToggle";

const Authorization = () => {
  return (
    <></>
  )
}

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