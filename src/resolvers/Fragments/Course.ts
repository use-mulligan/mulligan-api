export const CourseFragment = `
  fragment CourseFragment on Course {
    createdAt 
    updatedAt
    scoreCard
    courseName
    courseAddress
    coursePhone
    long
    lat 
    numberOfHoles
    holes {
      id
    }
  }
`;
