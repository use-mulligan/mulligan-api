export const StrokeFragment = `
  fragment StrokeFragment on Stroke {
    id
    createdAt
    updatedAt
    golferId
    profileId
    hole {
      holeNum
      handicap
      par
      distanceToFlag
      blueTee
      whiteTee
      redTee
    }
    scoreCard {
      id
    }
    strokes
  }
`;
