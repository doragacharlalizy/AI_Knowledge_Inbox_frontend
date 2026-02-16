// src/styles/GlobalStyles.js
// Updated global styled components with professional UI enhancements
// Maintains your existing theme structure while adding refined styling

import styled from 'styled-components';

// ============================================================================
// THEME - Enhanced with professional refinements
// ============================================================================

export const theme = {
  colors: {
    // Primary colors - Indigo palette
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    primaryLight: '#818cf8',
    
    // Secondary
    secondary: '#ec4899',
    
    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    
    // Status-specific backgrounds (for badges)
    successBg: '#dcfce7',
    successText: '#166534',
    warningBg: '#fef3c7',
    warningText: '#92400e',
    errorBg: '#fee2e2',
    errorText: '#991b1b',
    
    // Grayscale
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    
    // Additional utilities
    white: '#ffffff',
    black: '#000000',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
};

// ============================================================================
// GLOBAL STYLES
// ============================================================================

export const GlobalStyles = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(props) => props.theme.colors.gray50};
    color: ${(props) => props.theme.colors.gray900};
    line-height: 1.6;
  }

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    transition: color ${(props) => props.theme.transitions.normal};

    &:hover {
      color: ${(props) => props.theme.colors.primaryDark};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.gray100};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.gray300};
    border-radius: 4px;

    &:hover {
      background: ${(props) => props.theme.colors.gray400};
    }
  }

  /* Selection styling */
  ::selection {
    background: ${(props) => props.theme.colors.primary};
    color: white;
  }

  ::-moz-selection {
    background: ${(props) => props.theme.colors.primary};
    color: white;
  }
`;

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

export const Sidebar = styled.div`
  width: ${(props) => (props.isOpen ? '300px' : '0')};
  background-color: ${(props) => props.theme.colors.gray900};
  color: white;
  overflow-y: auto;
  transition: width ${(props) => props.theme.transitions.normal};
  box-shadow: ${(props) => props.theme.shadows.lg};
  z-index: 1000;

  @media (max-width: 768px) {
    position: absolute;
    height: 100vh;
    left: 0;
    top: 0;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
  padding: ${(props) => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(props) => props.theme.shadows.sm};
  z-index: 100;
`;

export const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing.xl};
  background-color: ${(props) => props.theme.colors.gray50};
`;

// ============================================================================
// COMMON COMPONENTS - Enhanced with professional styling
// ============================================================================

export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray200};
  border-radius: ${(props) => props.theme.borderRadius['2xl']};
  padding: ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all ${(props) => props.theme.transitions.normal};
  position: relative;
  overflow: hidden;

  /* Subtle top border accent on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.primaryDark});
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${(props) => props.theme.transitions.normal};
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.gray300};
    box-shadow: ${(props) => props.theme.shadows.md};
    transform: translateY(-2px);

    &::before {
      transform: scaleX(1);
    }
  }
`;

export const Button = styled.button`
  padding: ${(props) =>
    props.small
      ? `${props.theme.spacing.xs} ${props.theme.spacing.sm}`
      : `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  background-color: ${(props) => {
    if (props.outline) return 'transparent';
    if (props.variant === 'secondary') return props.theme.colors.secondary;
    return props.theme.colors.primary;
  }};
  color: ${(props) => (props.outline ? props.theme.colors.primary : 'white')};
  border: ${(props) =>
    props.outline
      ? `2px solid ${props.theme.colors.primary}`
      : 'none'};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: ${(props) => (props.small ? '0.875rem' : '1rem')};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: ${(props) => {
      if (props.outline) return props.theme.colors.primary;
      if (props.variant === 'secondary') return props.theme.colors.secondary;
      return props.theme.colors.primaryDark;
    }};
    color: ${(props) => (props.outline ? 'white' : 'white')};
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${(props) => `${props.theme.colors.primary}40`};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.gray300};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: all ${(props) => props.theme.transitions.normal};
  background-color: ${(props) => props.theme.colors.white};

  &:hover {
    border-color: ${(props) => props.theme.colors.gray400};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => `${props.theme.colors.primary}20`};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray400};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.gray300};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all ${(props) => props.theme.transitions.normal};
  background-color: ${(props) => props.theme.colors.white};

  &:hover {
    border-color: ${(props) => props.theme.colors.gray400};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => `${props.theme.colors.primary}20`};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray400};
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.gray700};
  font-size: 0.95rem;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${(props) =>
    `${props.theme.spacing.xs} ${props.theme.spacing.md}`};
  background-color: ${(props) => {
    if (props.status === 'completed') return props.theme.colors.successBg;
    if (props.status === 'processing') return props.theme.colors.warningBg;
    if (props.status === 'failed') return props.theme.colors.errorBg;
    return props.theme.colors.gray200;
  }};
  color: ${(props) => {
    if (props.status === 'completed') return props.theme.colors.successText;
    if (props.status === 'processing') return props.theme.colors.warningText;
    if (props.status === 'failed') return props.theme.colors.errorText;
    return props.theme.colors.gray700;
  }};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
  gap: ${(props) => props.theme.spacing.xs};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.columns || 'repeat(auto-fill, minmax(300px, 1fr))'};
  gap: ${(props) => props.gap || props.theme.spacing.lg};
`;

export const Flex = styled.div`
  display: flex;
  align-items: ${(props) => props.align || 'center'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  gap: ${(props) => props.gap || props.theme.spacing.md};
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid ${(props) => props.theme.colors.gray300};
  border-top-color: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  background-color: ${(props) => props.theme.colors.errorBg};
  color: ${(props) => props.theme.colors.errorText};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border-left: 4px solid ${(props) => props.theme.colors.error};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const SuccessMessage = styled.div`
  background-color: ${(props) => props.theme.colors.successBg};
  color: ${(props) => props.theme.colors.successText};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border-left: 4px solid ${(props) => props.theme.colors.success};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

// ============================================================================
// ADDITIONAL UTILITY COMPONENTS
// ============================================================================

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.gray900};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  letter-spacing: -0.5px;
`;

export const PageDescription = styled.p`
  color: ${(props) => props.theme.colors.gray600};
  font-size: 1rem;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray900};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.gray50} 0%,
    ${(props) => props.theme.colors.gray100} 100%
  );
  border: 2px dashed ${(props) => props.theme.colors.gray300};
  border-radius: ${(props) => props.theme.borderRadius['2xl']};
  color: ${(props) => props.theme.colors.gray600};
`;

export const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const MetaBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  padding: ${(props) =>
    `${props.theme.spacing.xs} ${props.theme.spacing.md}`};
  background-color: ${(props) => props.theme.colors.gray100};
  color: ${(props) => props.theme.colors.gray700};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 0.85rem;
  font-weight: 500;
`;

export const HelperText = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.gray500};
  margin-top: ${(props) => props.theme.spacing.xs};
  margin-bottom: 0;
`;

export default theme;