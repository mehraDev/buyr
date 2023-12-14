import { Helmet } from "react-helmet";
import { ISellerProfile } from "app/interfaces";

const toTitleCase = (phrase: string) =>
  phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const SEOHead: React.FC<{ profile: ISellerProfile }> = ({ profile }) => {
  if (!profile || !profile.name) {
    return null;
  }
  const titleCasedName = toTitleCase(profile.name);
  return (
    <Helmet>
      <title>{`${titleCasedName}`}</title>
      <meta
        name="description"
        content={`Learn more about ${profile.name} and their products.`}
      />
    </Helmet>
  );
};

export default SEOHead;
