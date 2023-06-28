import React from "react";
import styled from "styled-components";

interface ImageViewerProps {
  images: string[] | File[];
  width?: string;
  height?: string;
}

const ImageGrid = styled.div<{ width?: string; height?: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${({ width }) => width || "150px"}, 1fr));
  gap: 16px;
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
`;

const Image = styled.img<{ width?: string; height?: string }>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  object-fit: fill;
`;

const NoImagesText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #888;
`;

const ImageViewer: React.FC<ImageViewerProps> = ({ images, width, height }) => {
  if (images.length === 0) {
    return <NoImagesText>No images found.</NoImagesText>;
  }

  return (
    <ImageGrid width={width} height={height}>
      {images.map((src, index) => (
        <Image key={index}  alt={`Image ${index}`} width={width} height={height}/>
      ))}
    </ImageGrid>
  );
};

export default ImageViewer;
