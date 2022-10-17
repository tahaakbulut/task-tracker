import React from 'react';
import { Layout as Main, Tag } from 'antd';
const { Header, Footer, Content } = Main;
import styles from './index.module.scss';
import { DiGit } from 'react-icons/di';

function Layout({ children }) {
  return (
    <>
      <Header className={styles.header}>
        <a>LOGO</a>
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        <a href="#" className={styles.footer__tag}>
          <Tag color="#F1502F" icon={<DiGit size="1.2rem" />}></Tag>
          repository
        </a>
        <div className={styles.footer_copyright}>
          <b>©</b>
          <a
            href="https://github.com/tahaakbulut"
            className={styles.footer_copyright__link}
          >
            tahaakbulut
          </a>
        </div>
      </Footer>
    </>
  );
}

export default Layout;
