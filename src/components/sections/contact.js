import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    display: block;
    font-size: clamp(40px, 5vw, 60px);
    
    &:after {
      display: none;
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>

      <h2 className="numbered-heading title">Contact</h2>

      <p><a href="https://maps.app.goo.gl/hYkppMtgq24YL1sZ9">
        Room 5135, 614 E Daniel St.<br />
        School of Information Sciences,<br />
        University of Illinois at Urbana-Champaign,<br />
      </a></p>

      <p><a href="mailto:yunhuang@illinois.edu">
        yunhuang@illinois.edu
      </a></p>

      <p>
        Office Phone: (217) 244-0418
      </p>


      <a className="email-link" href={`mailto:${email}`}>
        Contact via Email
      </a>
    </StyledContactSection>
  );
};

export default Contact;
