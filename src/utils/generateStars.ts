export const generateStars = (numberOfStars: number | undefined) => {
  const survivalIcon = "⭐";
  const stars = Array(numberOfStars ?? 0).fill(survivalIcon);
  // If tier is less than 4, show the stars. Otherwise show one star and the number
  const starDisplay =
    (numberOfStars ?? 0) < 4
      ? stars.join(``)
      : `${survivalIcon}${numberOfStars ?? 0}`;
  return starDisplay;
};
