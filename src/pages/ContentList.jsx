import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiTrash2, FiEye, FiSearch } from 'react-icons/fi';
import useStore from '../store/store';
import { Card, Button, Flex, Grid } from '../styles/GlobalStyles';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  padding: 2rem;
`;

const HeaderSection = styled.div`
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.5px;
`;

const PageDescription = styled.p`
  color: #64748b;
  font-size: 1rem;
  margin: 0;
`;

const ControlsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  gap: 2rem;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex: 1;
`;

const FilterLabel = styled.span`
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
`;

const StyledSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
  color: #0f172a;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    border-color: #cbd5e1;
    background-color: #f8fafc;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const CreateButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
    height: fit-content;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  border: 2px dashed #cbd5e1;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  color: #0f172a;
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
`;

const EmptyDescription = styled.p`
  color: #64748b;
  margin: 0 0 2rem 0;
  font-size: 1rem;
`;

const GridContainer = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const ContentCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #2563eb);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
    transform: translateY(-2px);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const ContentHeader = styled.div`
  margin-bottom: 1rem;
`;

const ContentTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  word-break: break-word;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const MetaBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  background-color: #f1f5f9;
  color: #475569;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const Preview = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ActionBar = styled.div`
  display: flex;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #475569;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
    border-color: #cbd5e1;
    color: #0f172a;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const DeleteButton = styled(ActionButton)`
  &:hover {
    background-color: #fee2e2;
    border-color: #fecaca;
    color: #dc2626;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #64748b;
  font-size: 1.1rem;
`;

const ContentList=()=> {
  const navigate = useNavigate();
  const { content, contentLoading, deleteContent, fetchContent } = useStore();
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredContent = content?.filter(item => {
    if (typeFilter && item.content_type !== typeFilter) return false;
    if (statusFilter && item.status !== statusFilter) return false;
    return true;
  });

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await deleteContent(id);
        toast.success('Content deleted successfully');
      } catch (error) {
        toast.error('Failed to delete content');
      }
    }
  };

  const handleFilterChange = () => {
    fetchContent({ type: typeFilter, status: statusFilter });
  };

  const handleCardClick = (id) => {
    navigate(`/content/${id}`);
  };

  return (
    <PageContainer>
      <HeaderSection>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

        <div style={{display:'flex',flexDirection:'column'}}>
        <PageTitle>Content Library</PageTitle>
        <PageDescription>Manage and organize your ingested content</PageDescription>
        </div>
          <CreateButton onClick={() => navigate('/content/create')}>
          <FiPlus size={20} /> Add Content
        </CreateButton>
                </div>

      </HeaderSection>

      <ControlsBar>
        {/* <FilterSection>
          <FilterLabel>Filter by:</FilterLabel>
          <StyledSelect 
            value={typeFilter} 
            onChange={(e) => {
              setTypeFilter(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="">All Types</option>
            <option value="note">Notes</option>
            <option value="url">URLs</option>
          </StyledSelect>

          <StyledSelect 
            value={statusFilter} 
            onChange={(e) => {
              setStatusFilter(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </StyledSelect>
        </FilterSection> */}

      
      </ControlsBar>

      {contentLoading && (
        <LoadingSpinner>Loading your content...</LoadingSpinner>
      )}

      {!contentLoading && (!filteredContent || filteredContent.length === 0) && (
        <EmptyState>
          <EmptyIcon>📚</EmptyIcon>
          <EmptyTitle>No content yet</EmptyTitle>
          <EmptyDescription>Start by adding your first content item to build your knowledge base</EmptyDescription>
          <CreateButton onClick={() => navigate('/content/create')}>
            <FiPlus size={18} /> Create First Content
          </CreateButton>
        </EmptyState>
      )}

      {!contentLoading && filteredContent && filteredContent.length > 0 && (
        <GridContainer>
          {filteredContent.map(item => (
            <ContentCard key={item.id} onClick={() => handleCardClick(item.id)}>
              <ContentHeader>
                <ContentTitle>{item.title}</ContentTitle>
                <MetaInfo>
                  <MetaBadge>{item.type_display}</MetaBadge>
                  <MetaBadge>{item.chunk_count} chunks</MetaBadge>
                  <MetaBadge 
                    style={{
                      backgroundColor: item.status === 'completed' ? '#dcfce7' : 
                                      item.status === 'processing' ? '#fef3c7' : '#fee2e2',
                      color: item.status === 'completed' ? '#166534' : 
                             item.status === 'processing' ? '#92400e' : '#991b1b'
                    }}
                  >
                    {item.status_display}
                  </MetaBadge>
                </MetaInfo>
              </ContentHeader>
              
              <Preview>{item.preview}</Preview>
              
              <ActionBar>
                <ActionButton onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/content/${item.id}`);
                }}>
                  <FiEye size={16} /> View
                </ActionButton>
                <DeleteButton onClick={(e) => handleDelete(item.id, e)}>
                  <FiTrash2 size={16} /> Delete
                </DeleteButton>
              </ActionBar>
            </ContentCard>
          ))}
        </GridContainer>
      )}
    </PageContainer>
  );
}

export default ContentList;