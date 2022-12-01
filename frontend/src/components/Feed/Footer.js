import styles from "./Footer.module.css";

const Footer = () => {
  const linkedIn = [
    { name: "Stanley", link: "https://www.linkedin.com/in/stanley-ou/" },
    { name: "Daniel", link: "https://www.linkedin.com/in/daniel-kachun-wong/" },
    {
      name: "Reyhaneh",
      link: "https://www.linkedin.com/in/reyhaneh-abdollahi-408895110/",
    },
  ];

  return (
    <div className={styles.footerContainer}>
      <div>
        {linkedIn.map((link, idx) => {
          return (
            <>
              <a key={idx} href={link.link} className={styles.nameLinks}>
                {link.name}
              </a>
              {idx < linkedIn.length - 1 && (
                <span className={styles.dot}>·</span>
              )}
            </>
          );
        })}
      </div>
      <div className={styles.copyright}>© 2022 NOT INSTAGRAM FROM META</div>
    </div>
  );
};

export default Footer;
