import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiFileText, FiLink } from 'react-icons/fi';
import useStore from '../store/store';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
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

const FormCard = styled.form`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;

  &:last-of-type {
    margin-bottom: 2.5rem;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 1rem;
`;

const TypeSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const TypeOption = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;

  input {
    margin: 0;
    cursor: pointer;
    width: 18px;
    height: 18px;
  }

  &:hover {
    border-color: #cbd5e1;
    background-color: #f8fafc;
  }

  ${props => props.selected && `
    border-color: #3b82f6;
    background: linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%);
  `}
`;

const TypeIcon = styled.div`
  font-size: 1.5rem;
  color: #64748b;
  ${props => props.selected && `
    color: #3b82f6;
  `}
`;

const TypeLabel = styled.div`
  flex: 1;

  .title {
    font-weight: 600;
    color: #0f172a;
    margin: 0 0 0.25rem 0;
  }

  .description {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #0f172a;
  transition: all 0.2s ease;
  font-family: inherit;

  &::placeholder {
    color: #94a3b8;
  }

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  color: #0f172a;
  resize: vertical;
  min-height: 180px;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
`;

const SubmitButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: white;
  color: #0f172a;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const HelperText = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

const CreateContent=()=> {
  const navigate = useNavigate();
  const { createContent } = useStore();
  const [type, setType] = useState('note');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        content_type: type,
        title: title || 'Untitled',
      };

      if (type === 'note') {
        payload.raw_text = text;
      } else {
        payload.source_url = url;
      }

      const result = await createContent(payload);
      toast.success('Content created successfully!');
      navigate(`/content/${result.id}`);
    } catch (error) {
      toast.error('Failed to create content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate('/content')}>
        <FiArrowLeft size={18} /> Back to Content
      </BackButton>

      <HeaderSection>
        <PageTitle>Create New Content</PageTitle>
        <PageDescription>Add text or URL to your knowledge base</PageDescription>
      </HeaderSection>

      <FormCard onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Content Type</Label>
          <TypeSelector>
            <TypeOption selected={type === 'note'}>
              <input
                type="radio"
                name="type"
                value="note"
                checked={type === 'note'}
                onChange={(e) => setType(e.target.value)}
                id="type-note"
              />
              <TypeIcon selected={type === 'note'}>
                <FiFileText />
              </TypeIcon>
              <TypeLabel>
                <div className="title">Text Note</div>
                <p className="description">Paste or write content directly</p>
              </TypeLabel>
            </TypeOption>

            <TypeOption selected={type === 'url'}>
              <input
                type="radio"
                name="type"
                value="url"
                checked={type === 'url'}
                onChange={(e) => setType(e.target.value)}
                id="type-url"
              />
              <TypeIcon selected={type === 'url'}>
                <FiLink />
              </TypeIcon>
              <TypeLabel>
                <div className="title">URL</div>
                <p className="description">Import content from a web page</p>
              </TypeLabel>
            </TypeOption>
          </TypeSelector>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="title">Title (Optional)</Label>
          <Input
            id="title"
            type="text"
            placeholder="Give your content a descriptive title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <HelperText>Leave empty for automatic naming</HelperText>
        </FormGroup>

        {type === 'note' ? (
          <FormGroup>
            <Label htmlFor="content">Content</Label>
            <TextArea
              id="content"
              placeholder="Paste or type your content here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <HelperText>Supports plain text and formatted content</HelperText>
          </FormGroup>
        ) : (
          <FormGroup>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <HelperText>We'll fetch and process the content from this URL</HelperText>
          </FormGroup>
        )}

        <FormActions>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating...' : '✓ Create Content'}
          </SubmitButton>
          <CancelButton type="button" onClick={() => navigate('/content')}>
            Cancel
          </CancelButton>
        </FormActions>
      </FormCard>
    </PageContainer>
  );
}

export default CreateContent;