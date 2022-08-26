import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Form } from 'react-bootstrap';
import styles from './formLocation.module.scss';
import moveFrom from '../assets/moveFrom.svg';
import moveTo from '../assets/moveTo.svg';
// import Map from '../assets/map.png';
import { Country, State, City } from 'country-state-city';

const FormLocation = () => {
  const [location, setLocation] = useState({
    countryCode: '',
    stateCode: '',
    lat: '',
    lng: '',
    country: '',
    state: '',
    city: '',
  });
  useEffect(() => {}, [location.country, location.state, location.city]);
  return (
    <div className={styles.formLocation}>
      <div className={styles.formLabel}>
        <img src={moveFrom} alt="move from" />
        <label>Moving From</label>
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
          sx={{ width: 250 }}
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
            style={styleAutocomplete.bgWhite}
            onChange={(event, { isoCode, name }) =>
              setLocation((prev) => ({
                ...prev,
                stateCode: isoCode,
                state: name,
              }))
            }
            id="state-select-demo"
            sx={{ width: 250 }}
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
        {City.getCitiesOfState(location.countryCode, location.stateCode) > 0 ? (
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
            sx={{ width: 250 }}
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
        <Form.Control
          size="lg"
          type="text"
          className={styles.customBtn}
          placeholder="Street number"
        />
        <Form.Select aria-label="Default select example">
          <option>Floor number</option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
        </Form.Select>
      </div>
    </div>
  );
};

const styleAutocomplete = {
  bgWhite: {
    backgroundColor: ' #fff',
    margin: '20px 0',
  },
};

export default FormLocation;
