import { gql, useQuery } from '@urql/vue';

const query = gql`
query company {
    company {
        name
        ceo
    }
}
`;
const useApi = () => {
  const getCompanyInfo = useQuery({
    query,
    pause: true,
  });

  const fetchInfo = async () => {
    const result = await getCompanyInfo.executeQuery();
    if (result.error.value !== undefined || result.error.value !== null) {
      throw new Error(result.error.value?.message);
    }
    return result.data.value.company;
  };

  return {
    fetchInfo,
  };
};

export { useApi };
