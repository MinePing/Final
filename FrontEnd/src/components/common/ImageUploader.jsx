import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const ImageUploader = ({ label, onChange, onDelete, previewUrl }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // 외부에서 전달된 previewUrl이 있으면 사용
  useEffect(() => {
    if (previewUrl) {
      setPreview(previewUrl);
    }
  }, [previewUrl]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDelete = () => {
    setPreview(null);
    onDelete?.();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        onChange?.(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
      {preview ? (
        <Image src={preview} alt={label} onClick={handleClick} />
      ) : (
        <EmptyImage onClick={handleClick}>{label}</EmptyImage>
      )}
      {label === '추가 사진' && <Delete onClick={handleDelete}>사진 지우기</Delete>}
    </Container>
  );
};

export default ImageUploader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Image = styled.img`
  width: 150px;
  height: 100px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  object-fit: cover;
`;

const EmptyImage = styled.div`
  width: 150px;
  height: 100px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const Delete = styled.button`
  width: 150px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
  }
`;
