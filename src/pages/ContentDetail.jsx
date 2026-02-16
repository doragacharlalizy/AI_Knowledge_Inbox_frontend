import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import useStore from '../store/store';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #64748b;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    color: #0f172a;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 1rem 0;
  letter-spacing: -0.5px;
  word-break: break-word;
`;

const MetaBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const MetaBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f1f5f9;
  color: #475569;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const StatusBadge = styled(MetaBadge)`
  background-color: ${props => 
    props.status === 'completed' ? '#dcfce7' : 
    props.status === 'processing' ? '#fef3c7' : '#fee2e2'
  };
  color: ${props => 
    props.status === 'completed' ? '#166534' : 
    props.status === 'processing' ? '#92400e' : '#991b1b'
  };
`;

const ContentSection = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1.5rem 0;
`;

const RawContent = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
  color: #334155;
  line-height: 1.8;
  font-size: 0.95rem;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;

    &:hover {
      background: #94a3b8;
    }
  }
`;

const URLSection = styled.div`
  padding: 1.5rem;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const URLText = styled.a`
  color: #3b82f6;
  text-decoration: none;
  word-break: break-all;
  font-size: 0.95rem;
  flex: 1;
  transition: color 0.2s ease;

  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

const ExternalLinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }
`;

const ChunkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const ChunkCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  }
`;

const ChunkHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const ChunkNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ChunkLabel = styled.span`
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ChunkText = styled.p`
  color: #334155;
  line-height: 1.7;
  font-size: 0.95rem;
  margin: 0;
  word-break: break-word;
`;

const ChunkCount = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #64748b;
  font-size: 1.1rem;
`;

const ContentDetail=()=> {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedContent, fetchContentDetail, contentLoading } = useStore();

  useEffect(() => {
    fetchContentDetail(id);
  }, [id]);

  if (contentLoading || !selectedContent) {
    return (
      <PageContainer>
        <BackButton onClick={() => navigate('/content')}>
          <FiArrowLeft size={18} /> Back
        </BackButton>
        <LoadingState>Loading content...</LoadingState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton onClick={() => navigate('/content')}>
        <FiArrowLeft size={18} /> Back to Library
      </BackButton>

      <HeaderSection>
        <PageTitle>{selectedContent.title}</PageTitle>
        <MetaBar>
          <StatusBadge status={selectedContent.status}>
            {selectedContent.status_display}
          </StatusBadge>
          <MetaBadge>{selectedContent.type_display}</MetaBadge>
          <MetaBadge>{selectedContent.chunk_count} chunks</MetaBadge>
        </MetaBar>
      </HeaderSection>

      {selectedContent.raw_text && (
        <ContentSection>
          <SectionTitle>Raw Content</SectionTitle>
          <RawContent>{selectedContent.raw_text}</RawContent>
        </ContentSection>
      )}

      {selectedContent.url && (
        <ContentSection>
          <SectionTitle>Source URL</SectionTitle>
          <URLSection>
            <URLText href={selectedContent.url} target="_blank" rel="noopener noreferrer">
              {selectedContent.url}
            </URLText>
            <ExternalLinkButton 
              href={selectedContent.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Open <FiExternalLink size={16} />
            </ExternalLinkButton>
          </URLSection>
        </ContentSection>
      )}

      {selectedContent.chunks && selectedContent.chunks.length > 0 && (
        <ContentSection>
          <SectionTitle>Chunks</SectionTitle>
          <ChunkCount>
            {selectedContent.chunks.length} chunks • Auto-generated during processing
          </ChunkCount>
          <ChunkGrid>
            {selectedContent.chunks.map((chunk) => (
              <ChunkCard key={chunk.id}>
                <ChunkHeader>
                  <ChunkNumber>{chunk.order}</ChunkNumber>
                  <ChunkLabel>Chunk</ChunkLabel>
                </ChunkHeader>
                <ChunkText>{chunk.text}</ChunkText>
              </ChunkCard>
            ))}
          </ChunkGrid>
        </ContentSection>
      )}

      {(!selectedContent.chunks || selectedContent.chunks.length === 0) && !selectedContent.raw_text && !selectedContent.url && (
        <ContentSection>
          <p style={{ color: '#64748b', margin: 0 }}>No content details available</p>
        </ContentSection>
      )}
    </PageContainer>
  );
}

export default ContentDetail;