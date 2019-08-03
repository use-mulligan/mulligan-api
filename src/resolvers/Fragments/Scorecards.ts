export const ScorecardsFragment = `
  id
  createdAt
  updatedAt
  profile {
    id
    firstName
    lastName
    fullName
  }
  golfers {
    id
    name
  }
  course {
    courseName
    courseAddress
    coursePhone
    long
    lat
    numberOfHoles
  }
  strokes {
    hole {
      holeNum
      handicap
      par
      distanceToFlag
      blueTee
      whiteTee
      redTee
    }
    strokes
  }
  isActive
`;
