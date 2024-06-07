import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';


const StyledStudentsSection = styled.section`
`


const Students = () => {
	const revealTitle = useRef(null);
	const revealStudents = useRef([]);
	const prefersReducedMotion = usePrefersReducedMotion();

	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}

		sr.reveal(revealTitle.current, srConfig());
		sr.reveal(revealStudents.current, srConfig());
	}, []);

	return (
		<StyledStudentsSection id="students">
			<h2 className="numbered-heading" ref={revealTitle}>Students</h2>
			<p ref={revealStudents}>
				Please find her students from <a href="https://socialcomputing.web.illinois.edu/people.html">here</a>.
			</p>
		</StyledStudentsSection>
	);

};

export default Students;