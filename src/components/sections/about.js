import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 1100px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.sponsors-list {
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--lightest-slate);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const sponsors = [
    { name: "OpenAI", link: "https://openai.com/" },
    { name: "Google", link: "summer.html" },
    { name: "National Institute on Disability, Independent Living, and Rehabilitation Research (NIDILRR)", link: "http://www2.ed.gov/about/offices/list/osers/nidrr/index.html" },
    { name: "National Science Foundation", link: "http://www.nsf.gov/" },
    { name: "Institute of Museum and Library Services", link: "http://www.imls.gov/assets/1/AssetManager/2015_Sparks_LB21_grant_announcement.pdf" },
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Yun Huang is an associate professor at the{' '}
              <a href="https://ischool.illinois.edu/">School of Information Sciences</a>,{' '}
              <a href="https://illinois.edu/">University of Illinois at Urbana-Champaign</a>.{' '}
              She co-directs the{' '}
              <a href="https://socialcomputing.web.illinois.edu/index.html">
                <font color="#eb790e">SALT</font>
              </a> lab, focusing on social computing systems research. Before joining iSchool, she was a Postdoctoral Fellow of the{' '}
              <a href="http://www.ri.cmu.edu/index.html"> Robotics Institute </a>{' '}
              at <a href="http://www.cmu.edu/">Carnegie Mellon University</a>.{' '}
              Yun Huang received both her master's degree and doctorate from the{' '}
              <a href="http://www.ics.uci.edu/"> Donald Bren School of Information and Computer Sciences (ICS)</a>{' '}
              at <a href="http://www.uci.edu/"> UC Irvine</a>.{' '}
              She earned her bachelor's degree from the{' '}
              <a href="http://www.cs.tsinghua.edu.cn/publish/csen/index.html"> Department of Computer Science and Technology </a>{' '}
              at <a href="http://www.tsinghua.edu.cn/eng/index.jsp"> Tsinghua University</a>, Beijing, China. <br />
            </p>

            <p>
              Specific areas of her interests include Human Computer Interaction, Human-AI Collaboration, Mobile Computing, and Inclusive Web. More information can be found{' '}
              <a href="https://salt.ischool.illinois.edu/research.html#humanai">here</a>.<br />

              Her work is sponsored by:{' '}
              {/* <a class="text_href" href="https://openai.com/">OpenAI</a>,{' '}
              <a class="text_href" href="summer.html">Google</a>,{' '}
              <a class="text_href" href="http://www2.ed.gov/about/offices/list/osers/nidrr/index.html">National Institute on Disability, Independent Living, and Rehabilitation Research (NIDILRR)</a>,{' '}
              <a class="text_href" href="http://www.nsf.gov/">National Science Foundation</a> and{' '}
              <a class="text_href" href="http://www.imls.gov/assets/1/AssetManager/2015_Sparks_LB21_grant_announcement.pdf">Institute of Museum and Library Services</a>. */}
            </p>
          </div>

          <ul className="sponsors-list">
            {sponsors && sponsors.map(sponsor => <li key={sponsor.name}><a href={sponsor.link} target="_blank">{sponsor.name}</a></li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection >
  );
};

export default About;
