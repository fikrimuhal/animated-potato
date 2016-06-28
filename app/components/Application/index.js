import React from "react";
import Header from "../Header";
import styles from "./style";
import Deneme from "./Deneme";
import Deneme2 from "./Deneme2";
/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */

const Application = () => {
    return <div className={styles.main}>
        <div className={styles.wrap}>
            <Header />

            <main className={styles.body}>
                <p>Merhaba deneme fdskfjlkj Seems like creating your own React starter kit is a rite of passage. So,
                    here's mine.</p>
                <p>For more information, see the <a href="https://github.com/bradleyboy/yarsk#yarsk">Readme</a>.</p>
                <Deneme/>
                <Deneme2/>
            </main>
        </div>
    </div>;
};

Application.displayName = 'Application';

export default Application;
