import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledGrantsSection = styled.section`
	.grant-inner {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.grant-description {
		margin-bottom: 0px;
	}

	.grant-amount {
		width: 25%;
		text-align: right;
	}
`

const StyledGrant = styled.li`
	list-style: none;
	margin-bottom: 32px;
`

const Grants = () => {
	const data = useStaticQuery(graphql`
    query {
      grants: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/grants/" }
        }
        sort: { fields: [frontmatter___startDate], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              startDate
			  			endDate
			  			amount
            }
            html
          }
        }
      }
    }
  `);

	const revealTitle = useRef(null);
	const revealGrants = useRef([]);
	const prefersReducedMotion = usePrefersReducedMotion();

	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}

		sr.reveal(revealTitle.current, srConfig());
		revealGrants.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
	}, []);

	const grants = data.grants.edges.filter(({ node }) => node);

	const grantInner = node => {
		const { frontmatter, html } = node;
		const { startDate, endDate, amount } = frontmatter;

		const [description, pi] = html.split("<!--divider-->")

		const amountFormatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});

		return (
			<div className="grant-inner">
				<div>
					<div className="grant-title">
						<span>
							({startDate} - {endDate})
						</span>
						<h3 className="grant-description" dangerouslySetInnerHTML={{ __html: description }} />
					</div>
					<div className="grant-description-pi" dangerouslySetInnerHTML={{ __html: pi }} />
				</div>
				<div className="grant-amount">
					{amountFormatter.format(amount)}
				</div>
			</div>
		);
	};

	return (
		<StyledGrantsSection id="grants">
			<h2 className="numbered-heading" ref={revealTitle}>Grants</h2>

			<ul className="sponsors-grid">
				{prefersReducedMotion ? (
					<>
						{grants &&
							grants.map(({ node }, i) => (
								<StyledGrant key={i}>{grantInner(node)}</StyledGrant>
							))}
					</>
				) : (
					<TransitionGroup component={null}>
						{grants &&
							grants.map(({ node }, i) => (
								<CSSTransition
									key={i}
									classNames="fadeup"
									exit={false}>
									<StyledGrant
										key={i}
										ref={el => (revealGrants.current[i] = el)}
										style={{
										}}>
										{grantInner(node)}
									</StyledGrant>
								</CSSTransition>
							))}
					</TransitionGroup>
				)}
			</ul>

			{/* <button className="more-button" onClick={() => setShowMore(!showMore)}>
				Show {showMore ? 'Less' : 'More'}
			</button> */}
		</StyledGrantsSection>
	);
};

export default Grants;