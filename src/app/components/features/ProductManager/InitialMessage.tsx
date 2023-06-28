import { Box } from "ui/basic";

interface IInitialMessageProps {
  children: React.ReactNode;
}

const InitialMessage: React.FC<IInitialMessageProps> = ({ children }) => {
  return (
    <Box a="center" p="0 0 12rem" h="100%">
        {children}
    </Box>
  );
};

export default InitialMessage;
