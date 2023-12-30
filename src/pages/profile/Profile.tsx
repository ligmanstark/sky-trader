import { FC } from 'react';
import styled from '@emotion/styled';
import { Container } from '../../styled/components';
 import { SubHeader } from '../../components/subHeader/SubHeader';
import { YourProfileComponent } from '../../components/yourProfile/YourProfileComponent';
const Profile: FC = () => {
    if (typeof window !== "undefined")
    return (
        <Wrapper>
 

        <Container>
                <SubHeader />
                <YourProfileComponent/>
         </Container>
    </Wrapper>
)
};



  const Wrapper = styled.div``;
  export default Profile