const AccountFragment = `
  fragment AccountByIdFragment on Account {
    id
    email
    profile {
      id
      firstName
      lastName
      fullName
      scoreCards {
        id
      }
    }
  }
`;

export default AccountFragment;
