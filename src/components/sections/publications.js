import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';


const StyledPublicationsSection = styled.section`
`


const Publications = () => {
	const revealTitle = useRef(null);
	const revealPublications = useRef([]);
	const prefersReducedMotion = usePrefersReducedMotion();

	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}

		sr.reveal(revealTitle.current, srConfig());
		sr.reveal(revealPublications.current, srConfig());
	}, []);

	return (
		<StyledPublicationsSection id="publications">
			<h2 className="numbered-heading" ref={revealTitle}>Publications</h2>
			<p ref={revealPublications}>
				Please find her publications from <a href="https://socialcomputing.web.illinois.edu/publications.html">here</a>.
			</p>
		</StyledPublicationsSection>
	);

};

export default Publications;