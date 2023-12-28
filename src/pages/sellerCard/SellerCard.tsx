import { FC } from 'react';
import styled from '@emotion/styled';
import { Container } from '../../styled/components';
import { HelmetHead } from '../../components/HelmetHead';
import { SubHeader } from '../../components/subHeader/SubHeader';
import { ProfileComponents } from '../../components/profileComponents/ProfileComponents';
const SellerCard: FC = () => {
  if (typeof window !== "undefined")
    return (
        <Wrapper>
        <HelmetHead
            title={`Авито на свой лад`}
            descr={`Заработай свой первый рубль!`}
        />

        <Container>
                <SubHeader />
                <ProfileComponents/>
         </Container>
    </Wrapper>
)
};

  const Wrapper = styled.div``;
 
  export default SellerCard