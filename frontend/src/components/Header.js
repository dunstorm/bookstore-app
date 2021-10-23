import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

import BookIcon from './BookIcon'
import LockIcon from './LockIcon'
import ArrowLeftIcon from './ArrowLeftIcon'
import LogoutIcon from './LogoutIcon'
import HoverIcon from './HoverIcon'

export default function Header({ token, unsetToken }) {
    const history = useHistory();

    return (
        <div className="flex w-full justify-between rounded">
            <Link to="/" className="flex items-center">
                <BookIcon></BookIcon>
                <span className="font-semibold text-xl">Bookstore</span>
            </Link>
            <div className="flex items-center">
                {token && (
                    <>
                        <HoverIcon onClick={() => history.goBack()}><ArrowLeftIcon/></HoverIcon>
                        <HoverIcon onClick={unsetToken}><LogoutIcon /></HoverIcon>
                    </>
                )}
                {!token && <Link to="/login"><HoverIcon><LockIcon></LockIcon></HoverIcon></Link>}
            </div>
        </div>
    )
}
