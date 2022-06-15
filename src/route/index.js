import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';

import AppRoute from './app.routes';
import AuthRoute from './auth.routes';


export function Route(){
    const { signed, user } = useContext(AuthContext);

  return (
    signed ? <AppRoute/> : <AuthRoute/>
  );
}