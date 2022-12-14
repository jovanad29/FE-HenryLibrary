import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import validateReview from "./validate.js";
import {
    getAllReviews,
    createReviewByBook,
    getUserPaymentsBook,
} from "../../actions/index.js";
import ReviewsCard from "./ReviewsCard/ReviewsCard.jsx";
import Rating from "./Rating/Rating.jsx";
import { useTranslation } from "react-i18next";
//CSS
import styles from "./Reviews.module.css";
import {
    FormControl,
    FormLabel,
    Textarea,
    Flex,
    FormErrorMessage,
    Button,
} from "@chakra-ui/react";


function Reviews({ id }) {
    //Este id me lo traigo del componente BookDetail para traer los reviews por cada libro
    const { t } = useTranslation()
    const dispatch = useDispatch();

    const { displayName, email, reviews, uid, reviewsBook, isBanned } =
        useSelector((state) => state);

    useEffect(() => {
        setErrores("");
        dispatch(getAllReviews(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getUserPaymentsBook(uid, id));
    }, [dispatch, id, uid]);

    const setReviews = (value) => {
        setInput({ ...input, rating: value });
    };

    //ESTADO DE ERRORES
    const [errores, setErrores] = useState({});

    //ESTADO DEL FORMULARIO
    const [input, setInput] = useState({
        uid: uid, //id user
        descrption: "",
        rating: 1,
    });

    useEffect(() => {
        setInput({ ...input, uid: uid });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);

    function handleInputsChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        });

        setErrores(
            validateReview({
                ...input,
                [event.target.name]: event.target.value,
            })
        );
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(createReviewByBook(id, input));
        setInput({
            uid: uid, //id user
            descrption: "",
            rating: 1,
        });
    };

    const contadorDescription = input.descrption.length; //Contador para ir monstrando los caracteres consumidos

    return (
        <div className={styles.reviews}>
            <h2 className={styles.titulo}>{t("hayReviews")}</h2>

            <Flex className={styles.conteiner}>
                <Flex className={styles.review}>
                    {/* Aca renderizo cada review */}
                    <ReviewsCard reviews={reviews} />
                </Flex>

                {!isBanned && reviewsBook > 0 && (
                    <Flex className={styles.formularioContainer}>
                        <FormControl
                            isRequired
                            isInvalid={validateReview}
                            className={styles.formulario}
                        >
                            <div className={styles.info}>
                                <FormLabel className={styles.texto}>
                                    {t("username")}: {displayName}
                                </FormLabel>
                                <FormLabel className={styles.texto}>
                                    {t("correoe")}: {email}
                                </FormLabel>

                                <Flex>
                                    {" "}
                                    <Rating
                                        setReviews={setReviews}
                                        rating={input.rating}
                                    />
                                </Flex>
                            </div>

                            <div className={styles.descripcion}>
                                <span
                                    className={
                                        contadorDescription > 90
                                            ? styles.contadorError
                                            : styles.contador
                                    }
                                >
                                    {contadorDescription} {t("caracteres")}
                                </span>
                                <Textarea
                                    className={styles.textarea}
                                    value={input.descrption}
                                    name="descrption"
                                    onChange={handleInputsChange}
                                    placeholder={t("reviewPlaceholder")}
                                    _placeholder={{ color: "#01A86C" }}
                                    w="90%"
                                    h="60%"
                                    focusBorderColor="#01A86C"
                                    borderColor="#01A86C"
                                />
                                {errores.descrption && (
                                    <FormErrorMessage>
                                        {errores.descrption}
                                    </FormErrorMessage>
                                )}

                                <Button
                                    marginTop="1rem"
                                    bg="#01A86C"
                                    w="90%"
                                    h="40%"
                                    onClick={handleOnSubmit}
                                    _focus={{ outlineColor: 'none' }}
                                    className={styles.enviar}
                                    disabled={
                                        JSON.stringify(errores) === "{}" &&
                                        contadorDescription < 100 &&
                                        input.descrption.trim()
                                            ? false
                                            : true
                                    }
                                >
                                    ENVIAR
                                </Button>
                            </div>
                        </FormControl>
                    </Flex>
                )}
            </Flex>
        </div>
    );
}

export default Reviews;
