import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFileText, FiMessageSquare } from 'react-icons/fi';

const SidebarWrapper = styled.aside`
  width: ${props => (props.isOpen ? '280px' : '0')};
  background-color: ${props => props.theme.colors.gray900};
  color: white;
  overflow-y: auto;
  transition: width ${props => props.theme.transitions.normal};
  box-shadow: ${props => props.theme.shadows.lg};
  z-index: 1000;

  @media (max-width: 768px) {
    position: absolute;
    height: 100vh;
    left: 0;
    top: 0;
  }
`;

const Logo = styled.div`
  padding: ${props => props.theme.spacing.xl};
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  border-bottom: 1px solid ${props => props.theme.colors.gray700};
`;

const Nav = styled.nav`
  padding: ${props => props.theme.spacing.lg} 0;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  color: ${props => props.isActive ? props.theme.colors.primary : 'white'};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.normal};
  border-left: 3px solid ${props => props.isActive ? props.theme.colors.primary : 'transparent'};

  &:hover {
    background-color: ${props => props.theme.colors.gray800};
    color: ${props => props.theme.colors.primary};
  }

  svg {
    font-size: 1.25rem;
  }
`;

function Sidebar({ isOpen }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/content', label: 'Content', icon: FiFileText },
    { path: '/query', label: 'Query', icon: FiMessageSquare },
    { path: '/query-logs', label: 'Logs', icon: FiMessageSquare },
  ];

  return (
    <SidebarWrapper isOpen={isOpen}>
      <Logo>RAG Inbox</Logo>
      <Nav>
        {navItems.map(item => (
          <NavItem key={item.path} to={item.path} isActive={isActive(item.path)}>
            <item.icon />
            <span>{item.label}</span>
          </NavItem>
        ))}
      </Nav>
    </SidebarWrapper>
  );
}

export default Sidebar;
