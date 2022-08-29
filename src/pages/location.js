/* eslint-disable*/
import { useState } from 'react';
import SecondFooter from '../components/secondFooter';
import HrLine from '../components/hrLine';
import styles from './location.module.scss';
import { Row, Col, Button, Form } from 'react-bootstrap';
import backArrow from '../assets/backArrow.svg';
import moveFrom from '../assets/moveFrom.svg';
import moveTo from '../assets/moveTo.svg';
import classes from '../components/formLocation.module.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Country, State, City } from 'country-state-city';
import { addLocation } from '../redux/locationSlice';
import { useDispatch } from 'react-redux';

const Location = (props) => {
  const dispatch = useDispatch();
  // const Continue = (e) => {
  //   e.preventDefault();
  //   props.nextStep();
  // };

  const Back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const [location, setLocation] = useState({
    f_CountryCode: '',
    f_StateCode: '',
    f_Lat: '',
    f_Lng: '',
    f_Country: '',
    f_State: '',
    f_City: '',
    f_Floor: '',
    f_Street: '',
    t_CountryCode: '',
    t_StateCode: '',
    t_Lat: '',
    t_Lng: '',
    t_Country: '',
    t_State: '',
    t_City: '',
    t_Floor: '',
    t_Street: '',
    phone: '',
    info: '',
  });

  const handleInfoChange = (event) => {
    const { name, value } = event.target;
    setLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    dispatch(addLocation(location));
    props.nextStep();

    console.log(location);
  };

  return (
    <>
      <div className={styles.location}>
        <h3>Enter the details of your move</h3>
        <HrLine width="50px" />
        <form onSubmit={handleSubmit}>
          <Row className={styles.maps}>
            {/* from location */}
            <Col>
              <div className={classes.formLocation}>
                <div className={classes.formLabel}>
                  <img src={moveFrom} alt="move from" />
                  <label>Moving from</label>
                </div>
                <div className={classes.autoCompleteForm}>
                  <Autocomplete
                    disableClearable
                    style={styleAutocomplete.bgWhite}
                    className={classes.autoComplete}
                    onChange={(event, { isoCode, name }) =>
                      setLocation((prev) => ({
                        ...prev,
                        f_CountryCode: isoCode,
                        f_Country: name,
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
                        <span style={{ paddingRight: '10px' }}>
                          {option.flag}
                        </span>
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
                  <span>error</span>

                  {State.getStatesOfCountry(location.f_CountryCode).length >
                  0 ? (
                    <Autocomplete
                      disableClearable
                      className=" w3-animate-left"
                      style={styleAutocomplete.bgWhite}
                      onChange={(event, { isoCode, name }) =>
                        setLocation((prev) => ({
                          ...prev,
                          f_StateCode: isoCode,
                          f_State: name,
                        }))
                      }
                      id="state-select-demo"
                      sx={{ width: 230 }}
                      options={State.getStatesOfCountry(location.f_CountryCode)}
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
                  {City.getCitiesOfState(
                    location.f_CountryCode,
                    location.f_StateCode
                  ).length > 0 ? (
                    <Autocomplete
                      className=" w3-animate-left"
                      onChange={(event, { name, latitude, longitude }) =>
                        setLocation((prev) => ({
                          ...prev,
                          f_Lat: latitude,
                          f_Lng: longitude,
                          f_City: name,
                        }))
                      }
                      style={styleAutocomplete.bgWhite}
                      id="city-select-demo"
                      sx={{ width: 230 }}
                      options={City.getCitiesOfState(
                        location.f_CountryCode,
                        location.f_StateCode
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
                <div className={classes.formGroup}>
                  <TextField
                    sx={{ width: 230 }}
                    style={styleAutocomplete.bgWhiteWithoutMargin}
                    required
                    id="outlined-required"
                    label="Street number"
                    value={location.f_Street}
                    name="f_Street"
                    onChange={handleInfoChange}
                  />
                  <FormControl required={true} sx={{ m: 1, minWidth: 130 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Floor No
                    </InputLabel>
                    <Select
                      style={styleAutocomplete.bgWhiteWithoutMargin}
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={location.f_Floor}
                      label="Floor No."
                      onChange={(event) => {
                        setLocation((prev) => ({
                          ...prev,
                          f_Floor: event.target.value,
                        }));
                      }}
                    >
                      <MenuItem value={1}>1st</MenuItem>
                      <MenuItem value={2}>2nd</MenuItem>
                      <MenuItem value={3}>3rd</MenuItem>
                      <MenuItem value={4}>4th</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </Col>
            <Col
              xs={1}
              style={{ width: '5px', borderLeft: ' 3px dashed #bbb' }}
            ></Col>
            {/* To location */}
            <Col>
              <div className={classes.formLocation}>
                <div className={classes.formLabel}>
                  <img src={moveTo} alt="move to" />
                  <label>Moving to</label>
                </div>
                <div className={classes.autoCompleteForm}>
                  <Autocomplete
                    disableClearable
                    style={styleAutocomplete.bgWhite}
                    className={classes.autoComplete}
                    onChange={(event, { isoCode, name }) =>
                      setLocation((prev) => ({
                        ...prev,
                        t_CountryCode: isoCode,
                        t_Country: name,
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
                        <span style={{ paddingRight: '10px' }}>
                          {option.flag}
                        </span>
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

                  {State.getStatesOfCountry(location.t_CountryCode).length >
                  0 ? (
                    <Autocomplete
                      disableClearable
                      className=" w3-animate-left"
                      style={styleAutocomplete.bgWhite}
                      onChange={(event, { isoCode, name }) =>
                        setLocation((prev) => ({
                          ...prev,
                          t_StateCode: isoCode,
                          t_State: name,
                        }))
                      }
                      id="state-select-demo"
                      sx={{ width: 230 }}
                      options={State.getStatesOfCountry(location.t_CountryCode)}
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
                  {City.getCitiesOfState(
                    location.t_CountryCode,
                    location.t_StateCode
                  ).length > 0 ? (
                    <Autocomplete
                      className=" w3-animate-left"
                      onChange={(event, { name, latitude, longitude }) =>
                        setLocation((prev) => ({
                          ...prev,
                          t_Lat: latitude,
                          t_Lng: longitude,
                          t_City: name,
                        }))
                      }
                      style={styleAutocomplete.bgWhite}
                      id="city-select-demo"
                      sx={{ width: 230 }}
                      options={City.getCitiesOfState(
                        location.t_CountryCode,
                        location.t_StateCode
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
                <div className={classes.formGroup}>
                  <TextField
                    sx={{ width: 230 }}
                    style={styleAutocomplete.bgWhiteWithoutMargin}
                    required
                    id="outlined-required"
                    label="Street number"
                    value={location.t_Street}
                    name="t_Street"
                    onChange={handleInfoChange}
                  />
                  <FormControl required={true} sx={{ m: 1, minWidth: 130 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Floor No
                    </InputLabel>
                    <Select
                      style={styleAutocomplete.bgWhiteWithoutMargin}
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={location.t_Floor}
                      label="Floor No."
                      onChange={(event) =>
                        setLocation((prev) => ({
                          ...prev,
                          t_Floor: event.target.value,
                        }))
                      }
                    >
                      <MenuItem value={1}>1st</MenuItem>
                      <MenuItem value={2}>2nd</MenuItem>
                      <MenuItem value={3}>3rd</MenuItem>
                      <MenuItem value={4}>4th</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </Col>
          </Row>
          {/* extra info */}
          <Row
            style={{ borderBottom: '3px dashed var(--p-color)' }}
            className="pb-4 mt-5"
          >
            <Col className="mb-4" md={4}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Special Requests & Instructions:</Form.Label>
                <Form.Control
                  name="info"
                  value={location.info}
                  onChange={handleInfoChange}
                  as="textarea"
                  placeholder="We want you to have the best moving experience. Let us know if there's anything we can do to make your move day seamless."
                  rows={4}
                />
              </Form.Group>
            </Col>
            <Col md={{ span: 4, offset: 2 }} className="">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  name="phone"
                  value={location.phone}
                  onChange={handleInfoChange}
                  type="text"
                  placeholder="+0123456789"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-5" style={{ margin: '0 -15px' }}>
            <Col xs={6} sm={4}>
              <Button
                onClick={Back}
                style={styleBtns.btnShadow}
                variant="light"
              >
                <img className="pe-3" src={backArrow} alt="backArrow" /> Back To
                Inventory
              </Button>
            </Col>

            <Col xs={6} sm={{ span: 4, offset: 4 }}>
              <Button
                type="submit"
                onClick={handleSubmit}
                style={{ ...styleBtns.btnShadow, ...styleBtns.btnColor }}
                variant="light"
              >
                Save Details
              </Button>
            </Col>
          </Row>
        </form>
      </div>
      <SecondFooter />
    </>
  );
};

const styleBtns = {
  btnShadow: {
    boxShadow: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    borderRadius: '20px',
  },
  btnColor: {
    backgroundColor: '#A8DADB',
    color: '#fff',
    float: 'right',
    width: '150px',
  },
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

export default Location;
