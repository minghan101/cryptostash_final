import React from 'react';
import { styled } from '@mui/system'; // Correct import
import { Container, Typography } from '@mui/material';
import Register from '../Register'; // Adjust the path if necessary

const Banner = styled('div')({
    //backgroundImage: 'url(./banner_cryptohomepage.jpg)',
    height: 650,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 50,
    justifyContent: 'space-around',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    zIndex: 1, // Ensure it is above the star background
    backgroundColor: 'transparent', // Ensure it does not block the background
});

const Tagline = styled('div')({
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
});

const RegisterContainer = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

const BannerComponent = () => (
    <Banner>
        <Container>
            <Tagline>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: 0,
                        fontFamily: "Montserrat",
                        fontSize: 100,
                        color: "white",
                    }}
                >
                    CryptoStash
                </Typography>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: "gold",
                        textTransform: "capitalize",
                        fontFamily: "Montserrat",
                        fontSize: 20,
                        marginBottom: 10,
                    }}
                >
                    Your one stop platform for all things Crypto
                </Typography>
            </Tagline>
            <RegisterContainer>
                <Register />
            </RegisterContainer>
        </Container>
    </Banner>
);

export default BannerComponent;
