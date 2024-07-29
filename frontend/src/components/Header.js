import React from 'react';
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';
import { useCrypto } from '../CryptoContext';

// Define the dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
    background: {
      default: '#14161a',
    },
  },
});

// Create styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.main,
  position: 'fixed', // Make the AppBar fixed
  top: 0, // Align the AppBar to the top
  width: '100%', // Full width to cover the screen
  zIndex: theme.zIndex.drawer + 1, // Ensure it's above other components
}));

const Title = styled(Typography)(({ theme }) => ({
  flex: 1,
  color: 'gold',
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: 25,
}));

const NavLinks = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
});

const LinkStyled = styled(MuiLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  marginLeft: theme.spacing(2),
  '&:hover': {
    textDecoration: 'underline',
  },
}));

function Header() {
  const { currency, setCurrency } = useCrypto();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledAppBar position="static">
        <Container>
          <Toolbar>
            <Title onClick={() => navigate(`/`)} variant="h6">
              CryptoStash
            </Title>
            <NavLinks>
              <LinkStyled component={Link} to="/">
                Home
              </LinkStyled>
              <LinkStyled component={Link} to="/login">
                Logout
              </LinkStyled>
            </NavLinks>
            <Select
              variant="outlined"
              labelId="currency-select-label"
              id="currency-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="SGD">SGD</MenuItem>
              <MenuItem value="BTC">BTC</MenuItem>
              <MenuItem value="ETH">ETH</MenuItem>
              <MenuItem value="LTC">LTC</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </ThemeProvider>
  );
}

export default Header;
