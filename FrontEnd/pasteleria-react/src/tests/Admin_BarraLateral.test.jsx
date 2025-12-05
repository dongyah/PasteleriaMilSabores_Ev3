import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Admin_BarraLateral from '../pages/admin/Admin_BarraLateral'; 
import { describe, it, expect, afterEach } from 'vitest';

afterEach(cleanup);

describe('Componente Admin_BarraLateral', () => {

  it('debe renderizar los enlaces de navegación principales', () => {
    
    render(
      <BrowserRouter>
        <Admin_BarraLateral />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
  });
});