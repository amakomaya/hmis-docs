import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Comprehensive Patient Records',
    Svg: require('@site/static/img/sample.svg').default,
    description: (
      <>
        Store and manage complete electronic patient records, including visits,
        diagnoses, lab results, and treatment history.
      </>
    ),
  },
  {
    title: 'Focus on Patient Care',
    Svg: require('@site/static/img/sample.svg').default,
    description: (
      <>
        DHIS2 EHMIS helps you focus on quality patient care while the system
        handles data entry, reporting, and analytics in the background.
      </>
    ),
  },
  {
    title: 'EHMIS Documents',
    Svg: require('@site/static/img/sample.svg').default,
    description: (
      <>
        Access, manage, and share electronic health documents securely. Keep all
        patient reports, lab results, and medical forms centralized and easy to retrieve.
      </>
    ),
  },
  {
    title: 'Real-time Analytics',
    Svg: require('@site/static/img/sample.svg').default,
    description: (
      <>
        Track health indicators and monitor program performance in real-time
        using powerful dashboards and automated reports.
      </>
    ),
  },
  {
    title: 'Secure & Compliant',
    Svg: require('@site/static/img/sample.svg').default,
    description: (
      <>
        Protect sensitive health information with robust security measures,
        encryption, and audit trails to comply with national and international
        health data standards.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
