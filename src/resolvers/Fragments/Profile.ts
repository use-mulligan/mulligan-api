export const ProfileFragment = `
  fragment ProfileFragment on Profile {
    id
    createdAt
    updatedAt
    firstName
    lastName
    fullName
    scoreCards {
      id
    }
    account {
      id
      email
    }
  }
`;
