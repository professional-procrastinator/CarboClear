import styles from './shared.module.scss';
import Select from 'react-select';
import handler from '@/pages/api/hello';
import { useState } from 'react';
import Button from '@/components/Button';
import axios from '../../../utils/axios.js';

export default function OffsetPopup({ close }) {
  const [totalOffset, setTotalOffset] = useState();
  const [text, setText] = useState('');

  const [loading, setLoading] = useState(false);
  const calculateOffset = async (value) => {
    if (value == 1) {
      setTotalOffset(0.3);
    }

    if (value == 2) {
      setTotalOffset(0.4);
    }

    if (value == 3) {
      setTotalOffset(0.2);
    }

    if (value == 4) {
      setTotalOffset(0.1);
    }

    if (value == 5) {
      setTotalOffset(0.275);
    }

    if (value == 6) {
      setTotalOffset(0.1);
    }

    if (value == 7) {
      setTotalOffset(0.9);
    }

    setLoading(true);

    const { data } = await axios.post('/carbon', {
      text: text,
      type: 1,
      amount: totalOffset ? totalOffset : Math.random() * 100,
    });

    if (data.success) {
      setLoading(false);
      close(false);
    }

    console.log(totalOffset);
  };
  return (
    <div className={styles.body}>
      <div className={styles.body__title}>New Offset</div>
      <div className={styles.body__description}>
        Choose an activity, and then fill out the details. We'll use the average
        carbon offsets for that activity to calculate the carbon neutralized by
        you in tonnes.
      </div>
      <div className={styles.body__inputs}>
        <Select
          onChange={(e) => {
            setText(e.label);
            calculateOffset(e.value);
          }}
          options={[
            { label: 'Used a cloth bag', value: '1' },
            { label: 'Recycled metal waste', value: '2' },
            { label: 'Travelled by bus', value: '3' },
            { label: 'Cycled/walked to work/school', value: '4' },
            { label: 'Contributed to a community garden', value: '5' },
            { label: 'Used a reusable water bottle', value: '6' },
            { label: 'Planted a tree', value: '7' },
          ]}
        />
      </div>

      <div className={styles.body__footer}>
        <div
          className={styles.body__footer__button}
          onClick={() => {
            calculateOffset();
          }}
        >
          Go
        </div>
      </div>
    </div>
  );
}
