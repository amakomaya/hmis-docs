import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'EHMIS Nepal',
  tagline: 'Guiding Users and Administrators',
  favicon: 'https://dhis2.org/wp-content/uploads/dhis2-logo-rgb-positive.svg',

  // Set the production url of your site here
  url: 'https://docs.hispnp.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/hmis-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'amakomaya', // Usually your GitHub org/user name.
  projectName: 'dhis2-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts'
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/amakomaya/hmis-docs/tree/public/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'EHIMS',
      logo: {
        alt: 'EHIMS',
        src: 'https://dhis2.org/wp-content/uploads/dhis2-logo-rgb-positive.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs  ',
        }
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'DHIS2 Community',
              href: '#',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '#',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} EHMIS (IHIMS Nepal). Built with Amakomaya Nepal.`,
    },
    prism: {
      theme: prismThemes.duotoneLight,
      darkTheme: prismThemes.duotoneLight,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
