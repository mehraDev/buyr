import { Helmet } from "react-helmet";
import { ISellerProfile } from "app/interfaces";
import { getPwaLink } from "./s";

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
  const manifestUrl = getPwaLink(profile.id);
  const titleCasedName = toTitleCase(profile.name);
  return (
    <Helmet>
      <title>{`${titleCasedName}`}</title>
      {/* <link
        rel="icon"
        type="image/png"
        href={profile.profilePhotoUrl}
        sizes="16x16"
      /> */}
      <meta
        name="description"
        content={`Learn more about ${profile.name} and their products.`}
      />
      <link rel="manifest" href={manifestUrl} />
      {/* You can add more meta tags here for SEO as needed */}
    </Helmet>
  );
};

export default SEOHead;
