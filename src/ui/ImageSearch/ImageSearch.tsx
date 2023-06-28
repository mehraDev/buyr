import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ImageViewer from "ui/ImageViewer/ImageViewer";

interface IImageSearch {
  query: string;
  numResults: number;
}

const ImageSearch: React.FC<IImageSearch> = ({ query, numResults }) => {
  const [imageResults, setImageResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchImageResults = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        // Make the API call or query to retrieve image results based on the query and numResults
        const response = await fetch(`/api/images/search?query=${query}&numResults=${numResults}`);
        const data = await response.json();
        setImageResults(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching image results:", error);
       
        setTimeout(() => {
            setIsLoading(false);
            setHasError(true);
          }, 2000);
      }
    };

    // Trigger the image search only if query is not empty
    if (query) {
      fetchImageResults();
    }
  }, [query, numResults]);

  return (
    <>
      {isLoading ? (
        <Loader>
          <SearchEmoji>🔍</SearchEmoji>
          <DotContainer>
            <Dot />
            <Dot />
            <Dot />
          </DotContainer>
        </Loader>
      ) : (
        <>
          {hasError ? (
            <NoImagesFound>No images found</NoImagesFound>
          ) : (
            <>
              {imageResults.length > 0 && (
                <>
                  <p>Image Results</p>
                  <ImageViewer images={imageResults} />
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

const LoaderAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const SearchEmoji = styled.span`
  font-size: 2rem;
  margin-right: 0.5rem;
`;

const DotContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.span<{index?:number}>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 2px;
  animation: ${LoaderAnimation} 1s infinite;
  animation-delay: ${({ index }) =>index && index * 0.1}s;
`;

const NoImagesFound = styled.p`
  margin-top: 2rem;
  text-align: center;
`;

export default ImageSearch;
