import { useToast } from '../../hooks/useToast';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

describe('useToast Hook', () => {
  it('debe inicializar con estado por defecto', () => {
    const { result } = renderHook(() => useToast());
    
    expect(result.current.toast.show).toBe(false);
    expect(result.current.toast.title).toBe('');
    expect(result.current.toast.message).toBe('');
    expect(result.current.toast.variant).toBe('success');
  });

  it('debe mostrar toast con showToast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast('Test Title', 'Test Message', 'error');
    });
    
    expect(result.current.toast.show).toBe(true);
    expect(result.current.toast.title).toBe('Test Title');
    expect(result.current.toast.message).toBe('Test Message');
    expect(result.current.toast.variant).toBe('error');
  });

  it('debe ocultar toast con hideToast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast('Test Title', 'Test Message');
    });
    
    expect(result.current.toast.show).toBe(true);
    
    act(() => {
      result.current.hideToast();
    });
    
    expect(result.current.toast.show).toBe(false);
  });

  it('debe mostrar toast de éxito con showSuccess', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showSuccess('Success message', 'Success Title');
    });
    
    expect(result.current.toast.show).toBe(true);
    expect(result.current.toast.title).toBe('Success Title');
    expect(result.current.toast.message).toBe('Success message');
    expect(result.current.toast.variant).toBe('success');
  });

  it('debe mostrar toast de error con showError', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showError('Error message', 'Error Title');
    });
    
    expect(result.current.toast.show).toBe(true);
    expect(result.current.toast.title).toBe('Error Title');
    expect(result.current.toast.message).toBe('Error message');
    expect(result.current.toast.variant).toBe('error');
  });
});
