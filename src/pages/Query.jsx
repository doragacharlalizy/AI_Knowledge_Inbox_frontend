import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useStore from '../store/store';
import { toast } from 'react-toastify';
import { FiSend, FiChevronDown } from 'react-icons/fi';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
`;

const Header = styled.div`
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.25rem 0;
`;

const HeaderSubtitle = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;

    &:hover {
      background: #94a3b8;
    }
  }
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Message = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.isUser ? '#6366f1' : '#f1f5f9'};
  color: ${props => props.isUser ? 'white' : '#0f172a'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MessageText = styled.div`
  background: ${props => props.isUser ? '#6366f1' : 'white'};
  color: ${props => props.isUser ? 'white' : '#0f172a'};
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: ${props => props.isUser ? 'none' : '1px solid #e2e8f0'};
  line-height: 1.6;
  word-break: break-word;
  max-width: 100%;
  box-shadow: ${props => props.isUser 
    ? '0 2px 8px rgba(99, 102, 241, 0.2)' 
    : '0 1px 3px rgba(0, 0, 0, 0.05)'};

  p {
    margin: 0 0 0.5rem 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: ${props => props.isUser ? '#e0e7ff' : '#6366f1'};
    text-decoration: underline;

    &:hover {
      color: ${props => props.isUser ? 'white' : '#4f46e5'};
    }
  }
`;

const SourcesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
`;

const SourceItem = styled.div`
  padding: 0.875rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-left: 3px solid #6366f1;
  border-radius: 6px;
  font-size: 0.85rem;
`;

const SourceTitle = styled.div`
  font-weight: 600;
  color: #6366f1;
  margin-bottom: 0.25rem;
`;

const SourceSnippet = styled.div`
  color: #475569;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const SourceLink = styled.a`
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    text-decoration: underline;
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #64748b;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
`;

const EmptyDescription = styled.p`
  color: #64748b;
  margin: 0;
`;

const InputSection = styled.div`
  padding: 1.5rem 2rem 2rem 2rem;
  background: white;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
`;

const InputContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #0f172a;
  margin-bottom: 0.75rem;
`;

const SelectContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const StyledSelect = styled.select`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
  color: #0f172a;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  option {
    color: #0f172a;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const TopKSelect = styled(StyledSelect)`
  width: 120px;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const InputForm = styled.form`
  display: flex;
  gap: 0.75rem;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 0.875rem 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  font-size: 0.95rem;
  color: #0f172a;
  background: white;
  transition: all 0.2s ease;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.4rem;
  padding: 1rem 1.25rem;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #cbd5e1;
    animation: bounce 1.4s infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes bounce {
    0%, 80%, 100% {
      opacity: 0.5;
      transform: translateY(0);
    }
    40% {
      opacity: 1;
      transform: translateY(-8px);
    }
  }
`;

const MetaInfo = styled.div`
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 0.5rem;
  padding: 0 1rem;
`;

const Query=()=> {
  const { queryResult, queryLoading, content, askQuestion } = useStore();
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [topK, setTopK] = useState(5);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, queryLoading]);

  // Add result to messages when query completes
  useEffect(() => {
    if (queryResult && !queryLoading) {
      setMessages(prev => [
        ...prev,
        {
          type: 'assistant',
          text: queryResult.answer,
          sources: queryResult.sources || [],
          processingTime: queryResult.processing_time_ms
        }
      ]);
    }
  }, [queryResult, queryLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast.warning('Please enter a question');
      return;
    }

    // Add user message
    setMessages(prev => [
      ...prev,
      {
        type: 'user',
        text: question
      }
    ]);

    setQuestion('');

    try {
      await askQuestion(question, selectedContent || null, topK);
    } catch (error) {
      toast.error('Failed to get answer');
      // Remove the loading assistant message on error
      setMessages(prev => prev.filter(msg => msg.type !== 'assistant' || msg.text !== ''));
    }
  };

  return (
    <PageContainer>
      <Header>
        <HeaderTitle>Ask a Question</HeaderTitle>
        <HeaderSubtitle>Query your knowledge base with intelligent search</HeaderSubtitle>
      </Header>

      <ChatContainer>
        {messages.length === 0 ? (
          <EmptyState>
            <EmptyIcon>✨</EmptyIcon>
            <EmptyTitle>Start a conversation</EmptyTitle>
            <EmptyDescription>Ask a question about your content and get instant answers</EmptyDescription>
          </EmptyState>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <MessageGroup key={idx}>
                <Message>
                  <Avatar isUser={msg.type === 'user'}>
                    {msg.type === 'user' ? 'YOU' : 'AI'}
                  </Avatar>
                  <MessageContent>
                    <MessageText isUser={msg.type === 'user'}>
                      {msg.text}
                    </MessageText>
                    {msg.sources && msg.sources.length > 0 && (
                      <SourcesContainer>
                        {msg.sources.map((source, sourceIdx) => (
                          <SourceItem key={sourceIdx}>
                            <SourceTitle>{source.title || `Source ${sourceIdx + 1}`}</SourceTitle>
                            <SourceSnippet>{source.snippet}</SourceSnippet>
                            {source.url && (
                              <SourceLink href={source.url} target="_blank" rel="noopener noreferrer">
                                View source →
                              </SourceLink>
                            )}
                          </SourceItem>
                        ))}
                      </SourcesContainer>
                    )}
                    {msg.processingTime && (
                      <MetaInfo>Processed in {msg.processingTime}ms</MetaInfo>
                    )}
                  </MessageContent>
                </Message>
              </MessageGroup>
            ))}
            {queryLoading && (
              <MessageGroup>
                <Message>
                  <Avatar>AI</Avatar>
                  <MessageContent>
                    <MessageText isUser={false}>
                      <LoadingDots>
                        <span></span>
                        <span></span>
                        <span></span>
                      </LoadingDots>
                    </MessageText>
                  </MessageContent>
                </Message>
              </MessageGroup>
            )}
          </>
        )}
        <div ref={chatEndRef} />
      </ChatContainer>

      <InputSection>
        <InputContainer>
          {/* <SelectContainer>
            <InputLabel style={{ marginBottom: 0 }}>Filter by Content:</InputLabel>
            <StyledSelect
              value={selectedContent}
              onChange={(e) => setSelectedContent(e.target.value)}
            >
              <option value="">All Content</option>
              {content && content.map(item => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </StyledSelect>

            <TopKSelect
              value={topK}
              onChange={(e) => setTopK(parseInt(e.target.value))}
              title="Number of sources to retrieve"
            >
              {[1, 3, 5, 7, 10, 15, 20].map(num => (
                <option key={num} value={num}>
                  Top {num}
                </option>
              ))}
            </TopKSelect>
          </SelectContainer> */}

          <InputForm onSubmit={handleSubmit}>
            <TextInput
              placeholder="Ask something about your content..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={queryLoading}
              autoFocus
            />
            <SendButton type="submit" disabled={queryLoading || !question.trim()}>
              <FiSend size={20} />
            </SendButton>
          </InputForm>
        </InputContainer>
      </InputSection>
    </PageContainer>
  );
}

export default Query;