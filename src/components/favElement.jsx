import React, { useState } from 'react';
import useAuth from '../hook/useAuth';
import star from "../assets/star-fill.png"
import Modal, { ModalPortal } from './modal';
import LoginForm from "./loginForm"
import useFav from '../hook/useFav';
import Loading from './loading';

const FavElement = ({ id, isFav = false }) => {
    const { auth } = useAuth()
    const [showModal, setShowModal] = useState(false);
    const { isAFav, addNewFav, removeSuperFav , status } = useFav()

    const handleFav = () => {
        if (auth.token) {
            if (isAFav(id)) {
                removeSuperFav({ favId: id })
            }
            else {
                addNewFav({ favId: id, userId: auth.username })
            }
        }
        else {
            setShowModal(true)
        }
    }



    return (
        <>

            <div
                className={`${isFav ? "star-fav" : null} fav-component`}
                onClick={() => handleFav()}
            >

                <img src={star} alt="star" className={``} />
            </div>
            {showModal && <ModalPortal
                onClose={() => setShowModal(false)}
                title="You have to be logged!"
                rounded
            >
                <LoginForm background={false}/>
            </ModalPortal>
            }

            {status==="loading" && <ModalPortal rounded>

                    <div className='is-size-4 has-text-centered'>
                        <Loading />
                    </div>

                </ModalPortal>

            }

        </>
    );
}

export default FavElement;
