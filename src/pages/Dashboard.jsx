import React from 'react';
import styled from 'styled-components';
import { FiFileText, FiTrendingUp, FiMessageSquare, FiDatabase, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/store';

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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.gradientStart}, ${props => props.gradientEnd});
  }

  &:hover {
    border-color: #cbd5e1;
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(15, 23, 42, 0.08);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, ${props => props.gradientStart}20, ${props => props.gradientEnd}20);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${props => props.gradientStart};
  font-size: 24px;
`;

const StatLabel = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1;
`;

const ContentSection = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
`;

const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #3b82f6;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
  }
`;

const ContentList = styled.div`
  padding: 0;
`;

const ContentItemWrapper = styled.button`
  width: 100%;
  padding: 1.5rem 2rem;
  border: none;
  border-bottom: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ContentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const ContentInfo = styled.div`
  flex: 1;
`;

const ContentTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
`;

const ContentMeta = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: ${props => 
    props.status === 'completed' ? '#dcfce7' : 
    props.status === 'processing' ? '#fef3c7' : '#fee2e2'
  };
  color: ${props => 
    props.status === 'completed' ? '#166534' : 
    props.status === 'processing' ? '#92400e' : '#991b1b'
  };
  white-space: nowrap;
`;

const EmptyState = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  color: #64748b;
`;

const EmptyIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
`;

const EmptyLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Dashboard=()=> {
  const navigate = useNavigate();
  const { content, contentStats } = useStore();

  const stats = [
    {
      label: 'Total Content',
      value: contentStats?.total_content || 0,
      icon: <FiDatabase />,
      gradientStart: '#667eea',
      gradientEnd: '#764ba2'
    },
    {
      label: 'Total Chunks',
      value: contentStats?.total_chunks || 0,
      icon: <FiFileText />,
      gradientStart: '#f093fb',
      gradientEnd: '#f5576c'
    },
    {
      label: 'Completed',
      value: contentStats?.by_status?.completed || 0,
      icon: <FiTrendingUp />,
      gradientStart: '#4facfe',
      gradientEnd: '#00f2fe'
    },
    {
      label: 'Processing',
      value: contentStats?.by_status?.processing || 0,
      icon: <FiMessageSquare />,
      gradientStart: '#43e97b',
      gradientEnd: '#38f9d7'
    }
  ];

  return (
    <PageContainer>
      <HeaderSection>
        <PageTitle>Dashboard</PageTitle>
        <PageDescription>Overview of your RAG system</PageDescription>
      </HeaderSection>

      {/* <StatsGrid>
        {stats.map((stat, idx) => (
          <StatCard 
            key={idx}
            gradientStart={stat.gradientStart}
            gradientEnd={stat.gradientEnd}
          >
            <IconWrapper 
              gradientStart={stat.gradientStart}
              gradientEnd={stat.gradientEnd}
            >
              {stat.icon}
            </IconWrapper>
            <StatLabel>{stat.label}</StatLabel>
            <StatValue>{stat.value}</StatValue>
          </StatCard>
        ))}
      </StatsGrid> */}

      {content && content.length > 0 && (
        <ContentSection>
          <SectionHeader>
            <SectionTitle>Recent Content</SectionTitle>
            <ViewAllButton onClick={() => navigate('/content')}>
              View All <FiChevronRight size={18} />
            </ViewAllButton>
          </SectionHeader>
          <ContentList>
            {content.slice(0, 5).map(item => (
              <ContentItemWrapper 
                key={item.id}
                onClick={() => navigate(`/content/${item.id}`)}
              >
                <ContentItem>
                  <ContentInfo>
                    <ContentTitle>{item.title}</ContentTitle>
                    <ContentMeta>
                      {item.type_display} • {item.chunk_count} chunks
                    </ContentMeta>
                  </ContentInfo>
                  <StatusBadge status={item.status}>
                    {item.status_display}
                  </StatusBadge>
                </ContentItem>
              </ContentItemWrapper>
            ))}
          </ContentList>
        </ContentSection>
      )}

      {(!content || content.length === 0) && (
        <ContentSection>
          <EmptyState>
            <EmptyIcon>📚</EmptyIcon>
            <EmptyTitle>No content added yet</EmptyTitle>
            <p>
              <EmptyLink href="/content/create">Create your first content</EmptyLink> to get started
            </p>
          </EmptyState>
        </ContentSection>
      )}
    </PageContainer>
  );
}

export default Dashboard;