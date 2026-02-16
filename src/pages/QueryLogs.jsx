import React from 'react';
import styled from 'styled-components';
import { FiClock, FiFileText, FiZap } from 'react-icons/fi';
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

const LogsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
`;

const LogCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #8b5cf6, #6366f1);
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

const QueryText = styled.p`
  color: #0f172a;
  font-weight: 600;
  font-size: 1rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const AnswerPreview = styled.p`
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
  border-left: 3px solid #8b5cf6;
  color: #475569;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const MetaLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const MetaValue = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  text-align: center;
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

const EmptyLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  }
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #64748b;
  font-size: 1.1rem;
`;

const TimeFormatter = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};

const QueryLogs=()=> {
  const { queryLogs, logsLoading } = useStore();

  if (logsLoading) {
    return (
      <PageContainer>
        <HeaderSection>
          <PageTitle>Query Logs</PageTitle>
          <PageDescription>History of your questions and answers</PageDescription>
        </HeaderSection>
        <LoadingState>Loading your query history...</LoadingState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HeaderSection>
        <PageTitle>Query Logs</PageTitle>
        <PageDescription>Track your questions and system responses</PageDescription>
      </HeaderSection>

      {!queryLogs || queryLogs.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🔍</EmptyIcon>
          <EmptyTitle>No queries yet</EmptyTitle>
          <EmptyDescription>Start asking questions to build your query history</EmptyDescription>
          <EmptyLink href="/query">Ask a Question</EmptyLink>
        </EmptyState>
      ) : (
        <LogsGrid>
          {queryLogs.map(log => (
            <LogCard key={log.id}>
              <QueryText>{log.query_text}</QueryText>
              
              <AnswerPreview>
                {log.answer.substring(0, 150)}
                {log.answer.length > 150 ? '...' : ''}
              </AnswerPreview>

              <MetaGrid>
                <MetaItem>
                  <MetaLabel>
                    <FiFileText size={12} /> Sources
                  </MetaLabel>
                  <MetaValue>{log.sources?.length || 0}</MetaValue>
                </MetaItem>

                <MetaItem>
                  <MetaLabel>
                    <FiZap size={12} /> Speed
                  </MetaLabel>
                  <MetaValue>{log.processing_time_ms}ms</MetaValue>
                </MetaItem>

                <MetaItem>
                  <MetaLabel>
                    <FiClock size={12} /> When
                  </MetaLabel>
                  <MetaValue style={{ fontSize: '0.9rem' }}>
                    {TimeFormatter(log.created_at)}
                  </MetaValue>
                </MetaItem>
              </MetaGrid>
            </LogCard>
          ))}
        </LogsGrid>
      )}
    </PageContainer>
  );
}

export default QueryLogs;