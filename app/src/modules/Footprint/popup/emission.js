import styles from './shared.module.scss';
import Select from 'react-select';
import handler from '@/pages/api/hello';
import { useState } from 'react';
import Button from '@/components/Button';
import axios from '../../../utils/axios.js';

export default function EmissionPopup({ close }) {
  const [totalEmission, setTotalEmission] = useState();
  const [text, setText] = useState('');

  const [distanceOpen, setDistanceOpen] = useState(false);
  const [distance, setDistance] = useState(0);

  const [fuelOpen, setFuelOpen] = useState(false);
  const [fuel, setFuel] = useState(0);

  const [passengersOpen, setPassengersOpen] = useState(false);
  const [passengers, setPassengers] = useState(0);

  const [meatAmountOpen, setMeatAmountOpen] = useState(false);
  const [meatAmount, setMeatAmount] = useState(0);

  const [importedDistanceOpen, setImportedDistanceOpen] = useState(false);
  const [importedDistance, setImportedDistance] = useState(0);

  const [wasteAmountOpen, setWasteAmountOpen] = useState(false);
  const [wasteAmount, setWasteAmount] = useState(0);

  const [electricityOpen, setElectricityOpen] = useState(false);
  const [electricity, setElectricity] = useState(0);

  const [plasticAmountOpen, setPlasticAmountOpen] = useState(false);
  const [plasticAmount, setPlasticAmount] = useState(0);

  //thermo
  const [PowerRatingOpen, setPowerRatingOpen] = useState(false);
  const [powerRating, setPowerRating] = useState(0);

  const [timeOpen, setTimeOpen] = useState(false);
  const [time, setTime] = useState(0);

  const [loading, setLoading] = useState(false);

  const emissionHandler = (value) => {
    //reset all
    setDistanceOpen(false);
    setFuelOpen(false);
    setPassengersOpen(false);
    setMeatAmountOpen(false);
    setImportedDistanceOpen(false);
    setWasteAmountOpen(false);
    setElectricityOpen(false);
    setPlasticAmountOpen(false);
    setPowerRatingOpen(false);
    setTimeOpen(false);

    if (value.includes('transport')) {
      setDistanceOpen(true);
    }

    if (
      value.includes('transport') &&
      value != 'transport_1' &&
      value != 'transport_3'
    ) {
      setFuelOpen(true);
      setPassengersOpen(true);
    }

    if (value.includes('food') && value == 'food_1') {
      setMeatAmountOpen(true);
    }

    if (value.includes('food') && value == 'food_2') {
      setImportedDistanceOpen(true);
    }

    if (value.includes('food') && value == 'food_3') {
      setWasteAmountOpen(true);
    }

    if (value.includes('home') && value == 'home_1') {
      setElectricityOpen(true);
    }

    if (value.includes('home') && value == 'home_2') {
      setPlasticAmountOpen(true);
    }

    if (value.includes('home') && value == 'home_3') {
      setPowerRatingOpen(true);
      setTimeOpen(true);
    }
  };

  const calculateEmission = async () => {
    setLoading(true);
    console.log(
      distance,
      fuel,
      passengers,
      meatAmount,
      importedDistance,
      wasteAmount,
      electricity,
      plasticAmount,
      powerRating,
      time
    );

    if (distance !== 0 && fuel == 0 && passengers == 0) {
      setTotalEmission((distance / 780) * 90);
      console.log((distance / 780) * 90, totalEmission);
    }

    if (fuel !== 0 && passengers !== 0 && distance !== 0) {
      setTotalEmission((2.5 * fuel) / passengers);
    }

    if (meatAmount !== 0) {
      setTotalEmission(meatAmount * 0.01);
    }

    if (importedDistance !== 0) {
      setTotalEmission((importedDistance / 780) * 90);
    }

    if (wasteAmount !== 0) {
      setTotalEmission(wasteAmount * 0.0015);
    }

    if (electricity !== 0) {
      setTotalEmission(electricity * 0.9);
    }

    if (plasticAmount !== 0) {
      setTotalEmission(plasticAmount * 6);
    }

    if (powerRating !== 0 && timeOpen !== 0) {
      setTotalEmission(powerRating * time * 1.02);
    }

    const { data } = await axios.post('/carbon', {
      text: text,
      type: 0,
      amount: totalEmission ? totalEmission : Math.random() * 100,
    });

    if (data.success) {
      setLoading(false);
      close(false);

      return window.location.reload();
    }

    console.log(totalEmission);
  };
  return (
    <div className={styles.body}>
      <div className={styles.body__title}>New Emission</div>
      <div className={styles.body__description}>
        Choose an activity, and then fill out the details. We'll use the average
        carbon emissions for that activity to calculate the carbon emitted by
        you in tonnes.
      </div>
      <div className={styles.body__inputs}>
        <Select
          onChange={(e) => {
            setText(e.label);
            emissionHandler(e.value);
          }}
          options={[
            {
              label: 'Transport',
              options: [
                { label: 'Travelled by airplane', value: 'transport_1' },
                { label: 'Travelled by car', value: 'transport_2' },
                { label: 'Travelled by a cruise ship', value: 'transport_3' },
              ],
            },
            {
              label: 'Food',
              options: [
                { label: 'Ate meat/meat-based products', value: 'food_1' },
                { label: 'Ate imported food items', value: 'food_2' },
                { label: 'Wasted some food', value: 'food_3' },
              ],
            },
            {
              label: 'Energy and Lifestyle',
              options: [
                { label: 'Used electricity (with bill)', value: 'home_1' },
                { label: 'Used single-use plastics', value: 'home_2' },
                {
                  label: 'Used a thermostat to heat/cool a large space',
                  value: 'home_3',
                },
              ],
            },
          ]}
        />

        <div className={styles.body__inputs__details}>
          {distanceOpen && (
            <input
              style={
                fuelOpen && passengersOpen
                  ? { width: '33% !important' }
                  : { width: '50% !important' }
              }
              placeholder='Distance (km)'
              onChange={(e) => {
                setDistance(e.target.value);
              }}
            ></input>
          )}
          {fuelOpen && (
            <input
              style={
                distanceOpen && passengersOpen
                  ? { width: '33% !important' }
                  : { width: '50% !important' }
              }
              placeholder='Fuel (litres)'
              onChange={(e) => {
                setFuel(e.target.value);
              }}
            ></input>
          )}
          {passengersOpen && (
            <input
              style={
                fuelOpen && distanceOpen
                  ? { width: '33% !important' }
                  : { width: '50% !important' }
              }
              placeholder='Passengers'
              onChange={(e) => {
                setPassengers(e.target.value);
              }}
            ></input>
          )}

          {meatAmountOpen && (
            <input
              placeholder='Amount of meat (grams)'
              onChange={(e) => {
                setMeatAmount(e.target.value);
              }}
            ></input>
          )}

          {importedDistanceOpen && (
            <input
              placeholder='Distance (km)'
              onChange={(e) => {
                setImportedDistance(e.target.value);
              }}
            ></input>
          )}

          {wasteAmountOpen && (
            <input
              placeholder='Amount of waste (grams)'
              onChange={(e) => {
                setWasteAmount(e.target.value);
              }}
            ></input>
          )}

          {electricityOpen && (
            <input
              placeholder='Bill ($)'
              onChange={(e) => {
                setElectricity(e.target.value);
              }}
            ></input>
          )}

          {plasticAmountOpen && (
            <input
              placeholder='Amount of plastic (grams)'
              onChange={(e) => {
                setPlasticAmount(e.target.value);
              }}
            ></input>
          )}

          {PowerRatingOpen && (
            <input
              placeholder='Power Rating (kW)'
              onChange={(e) => {
                setPowerRating(e.target.value);
              }}
            ></input>
          )}
          {timeOpen && (
            <input
              placeholder='Time (hours)'
              onChange={(e) => {
                setTime(e.target.value);
              }}
            ></input>
          )}
        </div>
      </div>

      <div className={styles.body__footer}>
        <div
          className={styles.body__footer__button}
          onClick={() => {
            calculateEmission();
          }}
        >
          Go
        </div>
      </div>
    </div>
  );
}
