import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { Form } from 'react-bootstrap';
import styles from './formLocation.module.scss';
import { Country, State, City } from 'country-state-city';

const FormLocation = ({ icon, children }) => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [location, setLocation] = useState({
    countryCode: '',
    stateCode: '',
    lat: '',
    lng: '',
    country: '',
    state: '',
    city: '',
  });
  useEffect(() => {
    console.log(
      City.getCitiesOfState(location.countryCode, location.stateCode)
    );
  }, [location.country, location.state, location.city]);
  return (
    <div className={styles.formLocation}>
      <div className={styles.formLabel}>
        <img src={icon} alt="move " />
        <label>Moving {children}</label>
      </div>
      <div className={styles.autoCompleteForm}>
        <Autocomplete
          disableClearable
          style={styleAutocomplete.bgWhite}
          className={styles.autoComplete}
          onChange={(event, { isoCode, name }) =>
            setLocation((prev) => ({
              ...prev,
              countryCode: isoCode,
              country: name,
            }))
          }
          id="country-select-demo"
          sx={{ width: 230 }}
          options={Country.getAllCountries()}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.isoCode.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.isoCode.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.name} ({option.isoCode})
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              required
              {...params}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />

        {State.getStatesOfCountry(location.countryCode).length > 0 ? (
          <Autocomplete
            disableClearable
            className=" w3-animate-left"
            style={styleAutocomplete.bgWhite}
            onChange={(event, { isoCode, name }) =>
              setLocation((prev) => ({
                ...prev,
                stateCode: isoCode,
                state: name,
              }))
            }
            id="state-select-demo"
            sx={{ width: 230 }}
            options={State.getStatesOfCountry(location.countryCode)}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.name} ({option.isoCode})
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label="Choose a state"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
        ) : (
          ''
        )}
        {City.getCitiesOfState(location.countryCode, location.stateCode)
          .length > 0 ? (
          <Autocomplete
            onChange={(event, { name, latitude, longitude }) =>
              setLocation((prev) => ({
                ...prev,
                lat: latitude,
                lng: longitude,
                city: name,
              }))
            }
            style={styleAutocomplete.bgWhite}
            id="city-select-demo"
            sx={{ width: 230 }}
            options={City.getCitiesOfState(
              location.countryCode,
              location.stateCode
            )}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.name} ({option.isoCode})
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a city"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
        ) : (
          ''
        )}
      </div>
      <div className={styles.formGroup}>
        <TextField
          sx={{ width: 230 }}
          style={styleAutocomplete.bgWhiteWithoutMargin}
          required
          id="outlined-required"
          label="Street number"
          defaultValue=""
        />
        <FormControl sx={{ m: 1, minWidth: 130 }}>
          <InputLabel id="demo-simple-select-helper-label">Floor No</InputLabel>
          <Select
            required
            style={styleAutocomplete.bgWhiteWithoutMargin}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            label="Floor No."
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>1st</MenuItem>
            <MenuItem value={2}>2nd</MenuItem>
            <MenuItem value={3}>3rd</MenuItem>
            <MenuItem value={4}>3th</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

const styleAutocomplete = {
  bgWhite: {
    backgroundColor: ' #fff',
    margin: '20px 0',
  },
  bgWhiteWithoutMargin: {
    backgroundColor: ' #fff',
  },
};

export default FormLocation;
