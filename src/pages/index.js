import React from 'react';
import { graphql } from 'gatsby';
import dayjs from 'dayjs';

import '@react-website-themes/diary/styles/variables';
import '@react-website-themes/diary/styles/global';

import HomeIcon from 'react-feather/dist/icons/home';
import CalendarIcon from 'react-feather/dist/icons/calendar';
import ArrowRightIcon from 'react-feather/dist/icons/arrow-right';
import ClockIcon from 'react-feather/dist/icons/clock';
import ArrowUpIcon from 'react-feather/dist/icons/arrow-up';
import SkipForwardIcon from 'react-feather/dist/icons/skip-forward';

import Branding from '@react-website-themes/diary/components/Branding';
import Footer from '@react-website-themes/diary/components/Footer';
import Header from '@react-website-themes/diary/components/Header';
import Menu from '@react-website-themes/diary/components/Menu';
import Blog from '@react-website-themes/diary/components/Blog';
import Layout from '@react-website-themes/diary/components/Layout';
import Seo from '@react-website-themes/diary/components/Seo';
import Pagination from '@react-website-themes/diary/components/Pagination';

import config from 'content/meta/config';
import logo from 'content/images/logo.png';
import menuItems from 'content/meta/menu';

const blogIcons = {
  post: CalendarIcon,
  arrow: ArrowRightIcon,
  time: ClockIcon,
};

const actionIcons = {
  toTop: ArrowUpIcon,
};

const paginationIcons = {
  home: HomeIcon,
  last: SkipForwardIcon,
};

class IndexPage extends React.Component {
  state = {
    prevVisit: null,
  };

  componentDidMount() {
    if (typeof localStorage !== 'undefined') {
      const lastVisitDay = localStorage.getItem('lastVisitDay');
      const prevVisitDay = localStorage.getItem('prevVisitDay');
      const todayDay = dayjs().format('YYYY-MM-DD');

      if (!lastVisitDay) {
        localStorage.setItem('lastVisitDay', todayDay);
      } else {
        if (dayjs(todayDay).isAfter(dayjs(lastVisitDay))) {
          localStorage.setItem('lastVisitDay', todayDay);
          localStorage.setItem('prevVisitDay', lastVisitDay);
          this.setState({ prevVisit: lastVisitDay });
        } else {
          this.setState({ prevVisit: prevVisitDay });
        }
      }
    }
  }

  render() {
    const { prevVisit } = this.state;

    console.log(this.props);

    const {
      pageContext: { items, pageIndex, numberOfPages },
      data: {
        footerLinks: { html: footerLinksHTML },
        copyright: { html: copyrightHTML },
      },
    } = this.props;

    const {
      headerTitle,
      headerSubTitle,
      siteUrl,
      siteTitle,
      siteDescription,
      siteLanguage,
      city,
    } = config;

    return (
      <Layout>
        <Header>
          <Branding title={headerTitle} subTitle={headerSubTitle} logo={logo} />
          <Menu items={menuItems} actionIcons={actionIcons} />
        </Header>
        <Blog
          items={items}
          author={'greg'}
          icons={blogIcons}
          prevVisit={prevVisit}
          location={city}
          limit={10}
        />
        {numberOfPages > 1 && (
          <Pagination
            pageIndex={pageIndex}
            numberOfPages={numberOfPages}
            icons={paginationIcons}
          />
        )}
        <Footer links={footerLinksHTML} copyright={copyrightHTML} />
        <Seo
          url={siteUrl}
          language={siteLanguage}
          title={siteTitle}
          description={siteDescription}
        />
      </Layout>
    );
  }
}

export default IndexPage;

export const query = graphql`
  query {
    footerLinks: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/footerLinks/" }
    ) {
      html
    }
    copyright: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/copyright/" }
    ) {
      html
    }
  }
`;
