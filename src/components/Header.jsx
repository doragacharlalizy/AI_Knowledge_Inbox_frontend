import React from 'react';
import styled from 'styled-components';
import { FiMenu, FiSearch } from 'react-icons/fi';

const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.gray700};
  transition: color ${props => props.theme.transitions.normal};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.gray100};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  flex: 1;
  max-width: 500px;
  margin: 0 ${props => props.theme.spacing.xl};

  input {
    background: none;
    border: none;
    outline: none;
    flex: 1;
    margin-left: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.gray900};

    &::placeholder {
      color: ${props => props.theme.colors.gray400};
    }
  }
`;

function Header({ onMenuClick }) {
  return (
    <HeaderWrapper>
      <MenuButton onClick={onMenuClick}>
        <FiMenu />
      </MenuButton>
{/* 
      <SearchBar>
        <FiSearch color="#6b7280" />
        <input type="text" placeholder="Search content..." />
      </SearchBar> */}

      <div>
        <span style={{ color: '#666' }}>RAG Inbox</span>
      </div>
    </HeaderWrapper>
  );
}

export default Header;

