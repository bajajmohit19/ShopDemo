import React, {Fragment} from 'react';
import {Icon} from 'antd';
// import styles from './UserLayout.less';

const links = [
    {
        key: 'help',
        title: "HELP",
        href: '',
    }
];

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright"/> 2018
    </Fragment>
);

class UserLayout extends React.PureComponent {

    constructor (spr) {
        super(spr)
    }

    render () {
        const {children} = this.props;
        return (
            <div className={'container'}>
                <div className="content">
                    <div className="top">
                        <div className="header">
                        </div>
                        <div className="desc">Ishaan Sharma design</div>
                    </div>
                    {children}
                </div>
                {/*<GlobalFooter links={links} copyright={copyright}/>*/}
            </div>
        );
    }
}

export default UserLayout;
