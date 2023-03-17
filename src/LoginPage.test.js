import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'

import Login from './LoginPage';

describe('Login', () => {
  it('renders the login button', () => {
    render(
    <Router>
        <Login />
    </Router>
    );
    const loginButton = screen.getByText('Login with Spotify');
    expect(loginButton).toBeInTheDocument();
  });

  it('redirects to homepage after successful login', () => {
    
    window.location.hash = '#access_token=123456';
    window.localStorage.clear();

    render(
    <Router>
        <Login />
    </Router>);
    const loginButton = screen.getByText('Login with Spotify');
    fireEvent.click(loginButton);
        
    expect(window.location.href).toBe('http://localhost/homepage');
    expect(window.localStorage.getItem('token')).toBe('123456');
  });
});
